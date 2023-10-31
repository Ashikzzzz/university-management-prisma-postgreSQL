import {
  Prisma,
  PrismaClient,
  SemesterRegistration,
  SemesterStatus,
  StudentSemesterRegistration,
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

  if (!isSemesterRunning) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Semester is not created`);
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

// student semester reg
const startMyRegistration = async (
  authUserId: string
): Promise<{
  semesterRegistration: SemesterRegistration | null;
  studentSemesterRegistration: StudentSemesterRegistration | null;
}> => {
  const studentInfo = await prisma.student.findFirst({
    where: {
      student_id: authUserId,
    },
  });
  // console.log(studentInfo);
  if (!studentInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'student is not found');
  }
  const semesterRegInfo = await prisma.semesterRegistration.findFirst({
    where: {
      status: {
        in: [SemesterStatus.ONGOING, SemesterStatus.UPCOMING],
      },
    },
  });
  // console.log(semesterRegInfo);
  if (semesterRegInfo?.status === SemesterStatus.UPCOMING) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Semester isnot started yet');
  }

  let studentReg = await prisma.studentSemesterRegistration.findFirst({
    where: {
      student: {
        id: studentInfo?.id,
      },
      semesterRegistration: {
        id: semesterRegInfo?.id,
      },
    },
  });

  if (studentReg) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Semester is already registered'
    );
  }

  if (!studentReg) {
    studentReg = await prisma.studentSemesterRegistration.create({
      data: {
        student: {
          connect: {
            id: studentInfo?.id,
          },
        },
        semesterRegistration: {
          connect: {
            id: semesterRegInfo?.id,
          },
        },
      },
    });
  }
  return {
    semesterRegistration: semesterRegInfo,
    studentSemesterRegistration: studentReg,
  };
};

// enrollCourse
const enrollCourse = async (
  userId: string,
  payload: {
    offeredCourseId: string;
    offeredCourseSectionId: string;
  }
) => {
  const studentInfo = await prisma.student.findFirst({
    where: {
      student_id: userId,
    },
  });
  if (!studentInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student doesn't found");
  }

  const semesterRegInfo = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterStatus.ONGOING,
    },
  });
  if (!semesterRegInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, "semesterRegInfo doesn't found");
  }

  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: payload.offeredCourseId,
    },
  });

  if (!offeredCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, "Offered Course doesn't found");
  }

  const offeredCourseSection = await prisma.offeredCourseSection.findFirst({
    where: {
      id: payload.offeredCourseSectionId,
    },
  });

  if (!offeredCourseSection) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "offered Course Section doesn't found"
    );
  }

  if (
    offeredCourseSection.maxCapacity &&
    offeredCourseSection.currentlyEnrolledStudent &&
    offeredCourseSection.currentlyEnrolledStudent >=
      offeredCourseSection.maxCapacity
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This section is full');
  }
  await prisma.$transaction(async transactionClient => {
    await transactionClient.studentRegistrationCourse.create({
      data: {
        studentId: studentInfo?.id,
        semesterRegistrationId: semesterRegInfo?.id,
        offeredCourseId: payload.offeredCourseId,
        offeredCourseSectionId: payload.offeredCourseSectionId,
      },
    });
    await transactionClient.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },
      data: {
        currentlyEnrolledStudent: {
          increment: 1,
        },
      },
    });
    // await transactionClient.studentSemesterRegistration.update({
    //   where: {
    //     student: {
    //       id: studentInfo.id,
    //     },
    //     semesterRegistration: {
    //       id: semesterRegInfo.id,
    //     },
    //   },
    //   data: {
    //     totalCreditTaken: {
    //       increment: offeredCourse
    //     },
    //   },
    // });
  });

  return {
    message: 'Successfully enrolled to this course',
  };
};

// withdraw course
const withdrawCourse = async (
  userId: string,
  payload: {
    offeredCourseId: string;
    offeredCourseSectionId: string;
  }
) => {
  const studentInfo = await prisma.student.findFirst({
    where: {
      student_id: userId,
    },
  });
  if (!studentInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student doesn't found");
  }

  const semesterRegInfo = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterStatus.ONGOING,
    },
  });
  if (!semesterRegInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, "semesterRegInfo doesn't found");
  }

  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: payload.offeredCourseId,
    },
  });

  if (!offeredCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, "Offered Course doesn't found");
  }

  await prisma.$transaction(async transactionClient => {
    await transactionClient.studentRegistrationCourse.delete({
      where: {
        semesterRegistrationId_studentId_offeredCourseId: {
          semesterRegistrationId: semesterRegInfo?.id,
          studentId: studentInfo?.id,
          offeredCourseId: payload.offeredCourseId,
        },
      },
    });

    await transactionClient.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },
      data: {
        currentlyEnrolledStudent: {
          decrement: 1,
        },
      },
    });
    // await transactionClient.studentSemesterRegistration.update({
    //   where: {
    //     student: {
    //       id: studentInfo.id,
    //     },
    //     semesterRegistration: {
    //       id: semesterRegInfo.id,
    //     },
    //   },
    //   data: {
    //     totalCreditTaken: {
    //       decrement: offeredCourse
    //     },
    //   },
    // });
  });

  return {
    message: 'Successfully Withdraw to this course',
  };
};

// confirm registration
const confirmRegistration = async (
  userId: string
): Promise<{ message: string }> => {
  const semesterRegInfo = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterStatus.ONGOING,
    },
  });
  if (!semesterRegInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, "semesterRegInfo doesn't found");
  }
  console.log(semesterRegInfo);
  const studentSemesterRegistration =
    await prisma.studentSemesterRegistration.findFirst({
      where: {
        semesterRegistration: {
          id: semesterRegInfo.id,
        },
        student: {
          student_id: userId,
        },
      },
    });
  if (!studentSemesterRegistration) {
    throw new ApiError(httpStatus.NOT_FOUND, 'you are not recognized');
  }

  if (studentSemesterRegistration.totalCreditTaken === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'you are not enrolled');
  }

  if (
    studentSemesterRegistration.totalCreditTaken &&
    semesterRegInfo.maxCredit &&
    semesterRegInfo.minCredit &&
    (studentSemesterRegistration.totalCreditTaken < semesterRegInfo.minCredit ||
      studentSemesterRegistration.totalCreditTaken > semesterRegInfo.maxCredit)
  ) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `you can take only ${semesterRegInfo.minCredit} from ${semesterRegInfo.maxCredit}`
    );
  }

  await prisma.studentSemesterRegistration.update({
    where: {
      id: studentSemesterRegistration.id,
    },
    data: {
      isConfirmed: true,
    },
  });
  return {
    message: 'Your registration is Confirmed',
  };
};

export const semesterRegistrationService = {
  createSemesterRegistration,
  getAllRegisteredSemeter,
  getAsingleRegisterdSemester,
  deleteRegisterdSemester,
  updateRegisterdSemester,
  startMyRegistration,
  enrollCourse,
  withdrawCourse,
  confirmRegistration,
};
