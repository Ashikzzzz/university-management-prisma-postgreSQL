import { ExamType, PrismaClient } from '@prisma/client';
import {
  DefaultArgs,
  PrismaClientOptions,
} from '@prisma/client/runtime/library';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { getGradeForMarksUtils } from './studentEnrolledCourseMark.utils';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

const createStudentEnrolledMark = async (
  prismaClient: Omit<
    PrismaClient<PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
  payload: {
    studentId: string;
    studentEnrolledCourseId: string;
    academicSemesterId: string;
  }
) => {
  // create for midterm

  const isExistMidData = await prismaClient.studentEnrolledCourseMark.findFirst(
    {
      where: {
        examType: ExamType.MIDTERM,
        student: {
          id: payload.studentId,
        },
        studentEnrolledCourse: {
          id: payload.studentEnrolledCourseId,
        },
        academicSemester: {
          id: payload.academicSemesterId,
        },
      },
    }
  );

  if (!isExistMidData) {
    await prismaClient.studentEnrolledCourseMark.create({
      data: {
        studentId: payload.studentId,
        studentEnrolledCourseId: payload.studentEnrolledCourseId,
        academicSemesterId: payload.academicSemesterId,
        examType: ExamType.MIDTERM,
      },
    });
  }
  //   create for final
  const isExistFinalData =
    await prismaClient.studentEnrolledCourseMark.findFirst({
      where: {
        examType: ExamType.FINAL,
        student: {
          id: payload.studentId,
        },
        studentEnrolledCourse: {
          id: payload.studentEnrolledCourseId,
        },
        academicSemester: {
          id: payload.academicSemesterId,
        },
      },
    });

  if (!isExistFinalData) {
    await prismaClient.studentEnrolledCourseMark.create({
      data: {
        studentId: payload.studentId,
        studentEnrolledCourseId: payload.studentEnrolledCourseId,
        academicSemesterId: payload.academicSemesterId,
        examType: ExamType.FINAL,
      },
    });
  }
};

// update student marks
const updateMarks = async (payload: any) => {
  console.log('first', payload);
  const { studentId, academicSemesterId, marks, examType, courseId } = payload;

  const studentEnrolledCourseMarks =
    await prisma.studentEnrolledCourseMark.findMany({
      where: {
        student: {
          id: studentId,
        },
        academicSemester: {
          id: academicSemesterId,
        },
        studentEnrolledCourse: {
          course: {
            id: courseId,
          },
        },
        examType,
      },
    });

  if (!studentEnrolledCourseMarks) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Student enrolled course mark not found'
    );
  }

  const gradeResult = getGradeForMarksUtils.getGradeForMarks(marks);
  const updateStudentMarks = await prisma.studentEnrolledCourseMark.update({
    where: {
      id: studentId,
    },
    data: {
      grade: gradeResult.grade,
      marks,
    },
  });
  return updateStudentMarks;
};

export const stuentEnrolledCourseMarkService = {
  createStudentEnrolledMark,
  updateMarks,
};
