import { OfferedCourseSection, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

// create course section
const createCourseSection = async (
  data: OfferedCourseSection
): Promise<OfferedCourseSection> => {
  const result = await prisma.offeredCourseSection.create({
    data,
  });
  return result;
};

export const courseSectionService = {
  createCourseSection,
};
