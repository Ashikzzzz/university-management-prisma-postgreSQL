import { PrismaClient } from '@prisma/client';
import { IOfferedCourseData } from './offeredCourse.interface';

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
      const result = await prisma.offeredCourse.create({
        data: {
          academicDepartmentId,
          semesterRegistrationId,
          courseId,
        },
      });
      finalResult.push(result);
    }
  }

  return finalResult;
};

export const offeredCourseService = {
  createOfferedCourse,
};
