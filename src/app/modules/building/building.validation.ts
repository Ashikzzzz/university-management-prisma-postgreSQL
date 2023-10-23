import { z } from 'zod';

const academicBuildingtZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is Required',
    }),
  }),
});

export const academicBuildingZodValidation = {
  academicBuildingtZodSchema,
};
