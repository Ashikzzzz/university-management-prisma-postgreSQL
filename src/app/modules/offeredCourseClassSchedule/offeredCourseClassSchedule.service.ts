import {
  OfferedCourseClassSchedule,
  Prisma,
  PrismaClient,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  offeredCourseClassScheduleRelationalFieldsMapper,
  offeredCourseClassScheduleRelationalFiled,
} from './offeredCourseClassSchedule.constant';
import { offeredCourseScheduleFiltr } from './offeredCourseClassSchedule.interface';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

// create
const createCourseClassSchedule = async (
  data: OfferedCourseClassSchedule
): Promise<OfferedCourseClassSchedule> => {
  const alreadyBookedOnDay = await prisma.offeredCourseClassSchedule.findMany({
    where: {
      dayOfWeek: data.dayOfWeek,
      room: {
        id: data.roomId,
      },
      faculty: {
        id: data.facultyId,
      },
    },
  });

  const existingSlots = alreadyBookedOnDay.map(schedule => ({
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    dayOfWeek: schedule.dayOfWeek,
    faculty: schedule.facultyId,
  }));

  const newSlot = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfWeek,
    faculty: data.facultyId,
  };

  for (const slot of existingSlots) {
    const existingStart = new Date(`1970-01-01T${slot.startTime}:00`);
    const existingEnd = new Date(`1970-01-01T${slot.endTime}:00`);
    const newStart = new Date(`1970-01-01T${newSlot.startTime}:00`);
    const newEnd = new Date(`1970-01-01T${newSlot.endTime}:00`);

    if (newStart < existingEnd && newEnd > existingStart) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Room is booked');
    }
  }

  for (const faculty of existingSlots) {
    if (faculty.faculty === newSlot.faculty) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty is booked');
    }
  }

  const result = await prisma.offeredCourseClassSchedule.create({
    data,
    include: {
      offerCourseSection: true,
      semesterRegistration: {
        include: {
          academicSemester: true,
        },
      },
      room: true,
      faculty: true,
    },
  });
  return result;
};

// get all
const getAllOfferdCourseSchedule = async (
  filters: offeredCourseScheduleFiltr,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourseClassSchedule[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const searchableFiled = ['dayOfWeek']; // searchterm values
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
      AND: Object.keys(filtersData).map(key => {
        if (offeredCourseClassScheduleRelationalFiled.includes(key)) {
          return {
            [offeredCourseClassScheduleRelationalFieldsMapper[key]]: {
              id: (filtersData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filtersData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.OfferedCourseClassScheduleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offeredCourseClassSchedule.findMany({
    include: {
      faculty: true,
      semesterRegistration: true,
      offerCourseSection: true,
      room: true,
    },
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

  const total = await prisma.offeredCourseClassSchedule.count({
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

// get single
const getASingleClassSchedule = async (
  id: string
): Promise<OfferedCourseClassSchedule | null> => {
  const result = await prisma.offeredCourseClassSchedule.findUnique({
    where: {
      id,
    },
    include: {
      faculty: true,
      room: true,
    },
  });
  return result;
};

// update
const updateClassSchedule = async (
  id: string,
  payload: Partial<OfferedCourseClassSchedule>
): Promise<OfferedCourseClassSchedule | null> => {
  const result = await prisma.offeredCourseClassSchedule.update({
    where: {
      id,
    },
    data: payload,

    include: {
      faculty: true,
      room: true,
    },
  });
  return result;
};

// delete
const deleteClassSchedule = async (
  id: string
): Promise<OfferedCourseClassSchedule | null> => {
  const result = await prisma.offeredCourseClassSchedule.delete({
    where: {
      id,
    },
  });
  return result;
};

export const courseClassScheduleService = {
  createCourseClassSchedule,
  getASingleClassSchedule,
  getAllOfferdCourseSchedule,
  updateClassSchedule,
  deleteClassSchedule,
};
