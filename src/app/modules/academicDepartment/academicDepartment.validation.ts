import { z } from 'zod';

const academicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is Required',
    }),
  }),
});

export const academicDepartmentZodValidation = {
  academicDepartmentZodSchema,
};
