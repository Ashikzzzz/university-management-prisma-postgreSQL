import { z } from 'zod';

const academicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(['Spring', 'Summer', 'Fall'], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is Required',
    }),
    code: z.enum(['01', '02', '03'], {
      required_error: 'Code is Required',
    }),
    startMonth: z.enum(
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      {
        required_error: 'Start Month is required',
      }
    ),
    endMonth: z.enum(
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      {
        required_error: 'End Month is required',
      }
    ),
  }),
});

export const academicSemesterZodValidation = {
  academicSemesterZodSchema,
};
