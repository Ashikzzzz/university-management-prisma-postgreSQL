import {
  ExamType,
  PrismaClient,
  StudentEnrolledCourseStatus,
} from '@prisma/client';
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

// update student marks for final or mid
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

// update grade for mid+final

const updateTotalMarks = async (payload: any) => {
  const { studentId, academicSemesterId, courseId } = payload;

  const studentEnrolledCourse = await prisma.studentEnrollerdCourse.findFirst({
    where: {
      student: {
        id: studentId,
      },
      academicSemester: {
        id: academicSemesterId,
      },
      course: {
        id: courseId,
      },
    },
  });

  if (!studentEnrolledCourse) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Student enrolled course not found'
    );
  }

  const studentEnrolledCourseMark =
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
      },
    });

  if (!studentEnrolledCourseMark.length) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Student enrolled course mark not found'
    );
  }

  // mid term
  const midTermMark =
    studentEnrolledCourseMark.find(item => item.examType === ExamType.MIDTERM)
      ?.marks || 0;

  // final mark
  const finalMark =
    studentEnrolledCourseMark.find(item => item.examType === ExamType.FINAL)
      ?.marks || 0;

  const totalMarks = Math.ceil(midTermMark * 0.4) + Math.ceil(finalMark * 0.6);
  const grade = getGradeForMarksUtils.getGradeForMarks(totalMarks);

  await prisma.studentEnrollerdCourse.updateMany({
    where: {
      student: {
        id: studentId,
      },
      academicSemester: {
        id: academicSemesterId,
      },
      course: {
        id: courseId,
      },
    },
    data: {
      grade: grade.grade,
      point: grade.point,
      totalMarks: totalMarks,
      status: StudentEnrolledCourseStatus.COMPLETED,
    },
  });
};

export const stuentEnrolledCourseMarkService = {
  createStudentEnrolledMark,
  updateMarks,
  updateTotalMarks,
};
