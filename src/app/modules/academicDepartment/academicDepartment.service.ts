import { AcademicDepartment, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

// create academic faculty
const createAcademicDepartment = async (
  data: AcademicDepartment
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({
    data,
    include: {
      academicFaculty: true,
    },
  });
  return result;
};

// get all departments

export const academicDepartmentService = {
  createAcademicDepartment,
};
