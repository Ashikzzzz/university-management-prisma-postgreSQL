import { OfferedCourse, Prisma, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  offeredCourseRelationalFields,
  offeredCourseRelationalFieldsMapper,
} from './offeredCourse.constant';
import {
  IOfferedCourseData,
  IOfferedCourseFilterRequest,
} from './offeredCourse.interface';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

// create a offered course
const createOfferedCourse = async (data: IOfferedCourseData) => {
  const { academicDepartmentId, semesterRegistrationId, courseIds } = data;

  const finalResult = [];
  let courseId = [] as unknown as string;

  if (courseIds && courseIds.length > 0) {
    for (let i = 0; i < courseIds.length; i++) {
      courseId = courseIds[i];
      const isExist = await prisma.offeredCourse.findFirst({
        where: {
          academicDepartmentId,
          semesterRegistrationId,
          courseId,
        },
      });

      if (isExist) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'Offered course is already exist'
        );
      }

      if (!isExist) {
        const result = await prisma.offeredCourse.create({
          data: {
            academicDepartmentId,
            semesterRegistrationId,
            courseId,
          },
          include: {
            academicDepartment: true,
            semesterRegistration: true,
            course: true,
          },
        });
        finalResult.push(result);
      }
    }
  }

  return finalResult;
};

// get all offered course
const getAllOfferedCourse = async (
  filters: IOfferedCourseFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourse[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const offeredCourseSearchableFields: string[] = [];
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: offeredCourseSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (offeredCourseRelationalFields.includes(key)) {
          return {
            [offeredCourseRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.OfferedCourseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offeredCourse.findMany({
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.offeredCourse.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// get single offered course
const getSingleOfferedCourse = async (
  id: string
): Promise<OfferedCourse | null> => {
  const result = await prisma.offeredCourse.findUnique({
    where: {
      id,
    },
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
  });
  return result;
};

// update
const updateOfferedCourse = async (
  id: string,
  payload: Partial<OfferedCourse>
): Promise<OfferedCourse> => {
  const result = await prisma.offeredCourse.update({
    where: {
      id,
    },
    data: payload,
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
  });
  return result;
};

// delete offered course
const deleteOfferedCourse = async (id: string): Promise<OfferedCourse> => {
  const result = await prisma.offeredCourse.delete({
    where: {
      id,
    },
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
  });
  return result;
};

export const offeredCourseService = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};
