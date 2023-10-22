import { Faculty, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IFacultyFilter } from './faculty.interface';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

// create faculty
const createFaculty = async (data: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({
    data,
    include: {
      academicFaculty: true,
      academicDepartment: true,
    },
  });
  return result;
};

// get all faculty
const getAllFaculty = async (
  filters: IFacultyFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Faculty[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const searchableFiled = ['firstName', 'email', 'contactNo']; // searchterm values
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

  const whereConditions: Prisma.FacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.faculty.findMany({
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

  const total = await prisma.faculty.count();
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
const getAsingleFaculty = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// update a faculty
const updateAFaculty = async (
  id: string,
  payload: Faculty
): Promise<Faculty> => {
  const result = await prisma.faculty.update({
    where: { id },
    data: {
      firstName: payload.firstName,
      contactNo: payload.contactNo,
      bloodGroup: payload.bloodGroup,
    },
  });
  return result;
};

export const facultyService = {
  createFaculty,
  getAllFaculty,
  getAsingleFaculty,
  updateAFaculty,
};
