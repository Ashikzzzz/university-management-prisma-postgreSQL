import { Course, Prisma, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ICourseCreateData, ICourseFilter } from './course.interface';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

const createCourse = async (data: ICourseCreateData): Promise<any> => {
  const { preRequisiteCourse, ...courseData } = data;

  const newCourse = await prisma.$transaction(async transsectionClient => {
    const result = await transsectionClient.course.create({
      data: courseData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course ');
    }

    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      for (let i = 0; i < preRequisiteCourse.length; i++) {
        const createRequsiteData =
          await transsectionClient.courseToPreRequisite.create({
            data: {
              courseId: result.id,
              preRequisiteId: preRequisiteCourse[i].courseId,
            },
          });
        console.log(createRequsiteData);
        // return createRequsiteData;
      }
    }
    return result;
  });

  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.code,
      },
      include: {
        preRequisite: {
          include: {
            preRequisite: true,
          },
        },
        preRequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });
    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course ');
};

// get all course

const getAllCourses = async (
  filters: ICourseFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Course[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const searchableFiled = ['title', 'code']; // searchterm values
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

  const whereConditions: Prisma.CourseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.course.findMany({
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

  const total = await prisma.course.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// get a single course
const getSingleCourse = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      preRequisite: {
        include: {
          preRequisite: true,
        },
      },
      preRequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });
  return result;
};

// delete a course
const deleteCourse = async (id: string): Promise<Course> => {
  await prisma.courseToPreRequisite.deleteMany({
    where: {
      OR: [
        {
          courseId: id,
        },
        {
          preRequisiteId: id,
        },
      ],
    },
  });
  const result = await prisma.course.delete({
    where: {
      id,
    },
  });

  return result;
};

// update course
const updateCourse = async (
  id: string,
  payload: ICourseCreateData
): Promise<Course | null> => {
  const result = await prisma.course.update({
    where: { id },
    data: payload,
  });
  return result;
};

export const courseService = {
  createCourse,
  getSingleCourse,
  getAllCourses,
  deleteCourse,
  updateCourse,
};
