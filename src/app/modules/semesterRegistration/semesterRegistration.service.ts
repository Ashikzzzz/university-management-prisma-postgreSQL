import {
  Prisma,
  PrismaClient,
  SemesterRegistration,
  SemesterStatus,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IRegisterdSemester } from './semesterRegistration.interface';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

// create semester registration
const createSemesterRegistration = async (
  payload: SemesterRegistration
): Promise<SemesterRegistration> => {
  const isSemesterRunning = await prisma.semesterRegistration.findFirst({
    where: {
      OR: [
        {
          status: SemesterStatus.ONGOING,
        },
        {
          status: SemesterStatus.UPCOMING,
        },
      ],
    },
  });

  if (isSemesterRunning) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Semester is ${isSemesterRunning.status}`
    );
  }

  const result = await prisma.semesterRegistration.create({
    data: payload,
  });
  return result;
};

// get all registered semester
const getAllRegisteredSemeter = async (
  filters: IRegisterdSemester,
  options: IPaginationOptions
): Promise<IGenericResponse<SemesterRegistration[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const searchableFiled = ['status', 'startDate', 'endDate']; // searchterm values
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: searchableFiled.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // for filter we are getting an object
  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.SemesterRegistrationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.semesterRegistration.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.semesterRegistration.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// get single registerd semester
const getAsingleRegisterdSemester = async (
  id: string
): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
    include: {
      academicSemester: true,
    },
  });
  return result;
};

// delete registerd semester
const deleteRegisterdSemester = async (
  id: string
): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.delete({
    where: {
      id,
    },
    include: {
      academicSemester: true,
    },
  });
  return result;
};

// update registerd semester
const updateRegisterdSemester = async (
  id: string,
  payload: Partial<SemesterRegistration>
): Promise<SemesterRegistration | null> => {
  const isExist = await prisma.semesterRegistration.findUnique({
    where: { id },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Semester can't find");
  }

  if (
    payload.status &&
    isExist.status === SemesterStatus.UPCOMING &&
    payload.status !== SemesterStatus.ONGOING
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Can only move from UPCOMING to ONGOING'
    );
  }

  if (
    payload.status &&
    isExist.status === SemesterStatus.ONGOING &&
    payload.status !== SemesterStatus.ENDED
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Can only move from UPCOMING to ONGOING'
    );
  }

  const result = await prisma.semesterRegistration.update({
    where: { id },
    data: payload,
    include: {
      academicSemester: true,
    },
  });
  return result;
};

export const semesterRegistrationService = {
  createSemesterRegistration,
  getAllRegisteredSemeter,
  getAsingleRegisterdSemester,
  deleteRegisterdSemester,
  updateRegisterdSemester,
};