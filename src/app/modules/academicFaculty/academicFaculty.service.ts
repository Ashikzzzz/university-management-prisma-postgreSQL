import { AcademicFaculty, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAcademicFacultyFilter } from './academicFaculty.interface';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

// create academic faculty
const createAcademicFaculty = async (
  academicFacultyData: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data: academicFacultyData,
  });
  return result;
};

// get academic faculty

const getAllFaculty = async (
  filters: IAcademicFacultyFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const searchableFiled = ['title']; // searchterm values
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

  const whereConditions: Prisma.AcademicFacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicFaculty.findMany({
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

  const total = await prisma.academicFaculty.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// get a single faculty
const getAsingleFaculty = async (
  id: string
): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// update a academic faculty
const updateAcademicFaculty = async (
  id: string,
  payload: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteFaculty = async (id: string): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.delete({
    where: {
      id,
    },
  });
  return result;
};

export const academicFacultyService = {
  createAcademicFaculty,
  getAllFaculty,
  getAsingleFaculty,
  updateAcademicFaculty,
  deleteFaculty,
};
