import { OfferedCourseClassSchedule, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

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
    },
  });

  const existingSlots = alreadyBookedOnDay.map(schedule => ({
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    dayOfWeek: schedule.dayOfWeek,
  }));

  const newSlot = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfWeek,
  };

  for (const slot of existingSlots) {
    const existingStart = new Date(`1970-01-01T${slot.startTime}:00`);
    const existingEnd = new Date(`1970-01-01T${slot.endTime}:00`);
    const newStart = new Date(`1970-01-01T${newSlot.startTime}:00`);
    const newEnd = new Date(`1970-01-01T${newSlot.endTime}:00`);

    if (newStart < existingEnd && newEnd > existingStart) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid time');
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

export const courseClassScheduleService = {
  createCourseClassSchedule,
};
