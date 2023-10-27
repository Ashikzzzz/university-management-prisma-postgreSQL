import {
  PrismaClient,
  SemesterRegistration,
  SemesterStatus,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

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

export const semesterRegistrationService = {
  createSemesterRegistration,
};
