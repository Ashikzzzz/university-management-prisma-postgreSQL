import { PrismaClient, Student } from '@prisma/client';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

// create student
const createStudent = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data,
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academicSemester: true,
    },
  });
  return result;
};

export const studentService = {
  createStudent,
};
