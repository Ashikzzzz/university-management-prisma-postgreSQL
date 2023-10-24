import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

// create building
const createCourse = async (data: any): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async transactionCourse => {
    const result = await transactionCourse.course.create({
      data: courseData,
    });
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (let i = 0; i < preRequisiteCourses.length; i++) {
        const createPreRequisite =
          await transactionCourse.courseToPreRequisite.create({
            data: {
              courseId: result.id,
              preRequisiteId: preRequisiteCourses[i].courseId,
            },
          });
        console.log(createPreRequisite);
      }
    }
    return result;
  });

  return newCourse;
};

export const courseService = {
  createCourse,
};
