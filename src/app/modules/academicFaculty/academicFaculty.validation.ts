import { z } from 'zod';

const academicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is Required',
    }),
  }),
});

export const academicFacultyZodValidation = {
  academicFacultyZodSchema,
};
