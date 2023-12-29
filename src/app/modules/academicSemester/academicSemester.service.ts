import { AcademicSemester, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAcademicSemesterFilter } from './academicSemester.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { RedisClient } from '../../../shared/redis';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

// create academic semester
const createAcademicSemester = async (
  payload: AcademicSemester
): Promise<AcademicSemester> => {
  if (
    (payload.title === 'Spring' && payload.code === '01') ||
    (payload.title === 'Autumn' && payload.code === '02') ||
    (payload.title === 'Fall' && payload.code === '03')
  ) {
    const result = await prisma.academicSemester.create({
      data: payload,
    });

    // data publish on redis
    if (result) {
      await RedisClient.publish(
        'academic-semester.create',
        JSON.stringify(result)
      );
    }

    return result;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester Code');
  }
};

// get all semester
const getAllSemesters = async (
  filters: IAcademicSemesterFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const searchableFiled = ['title', 'code', 'startMonth', 'endMonth']; // searchterm values
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

  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicSemester.findMany({
    where:
      // OR: [
      //   {
      //     title: {
      //       contains: searchTerm,
      //       mode: 'insensitive',
      //     },
      //   },
      //   {
      //     code: {
      //       contains: searchTerm,
      //       mode: 'insensitive',
      //     },
      //   },
      // ],
      whereConditions,
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

  const total = await prisma.academicSemester.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// get a single semester
const getAsingleSemester = async (
  id: string
): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// update academic semester
const updateSemester = async (
  id: string,
  payload: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.update({
    where: { id },
    data: payload,
  });
  return result;
};

// delete semester
const deleteSemester = async (id: string): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.delete({
    where: {
      id,
    },
  });
  return result;
};
export const academicSemesterService = {
  createAcademicSemester,
  getAllSemesters,
  getAsingleSemester,
  updateSemester,
  deleteSemester,
};
