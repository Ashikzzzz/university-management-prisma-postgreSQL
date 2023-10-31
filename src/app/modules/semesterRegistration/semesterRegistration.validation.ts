import { z } from 'zod';

const registerdSemesterZodSchema = z.object({
  body: z.object({
    startDate: z.string({
      required_error: 'Start date is required',
    }),
    endDate: z.string({
      required_error: 'End date is required',
    }),
    status: z.enum(['UPCOMING', 'ONGOING', 'ENDED'], {
      required_error: 'Status is required',
    }),
    academicSemesterId: z.string({
      required_error: 'Academic semester id is required',
    }),
    minCredit: z.number({
      required_error: 'Min credit is required',
    }),
    maxCredit: z.number({
      required_error: 'Max credit is required',
    }),
  }),
});

const enrollOrWithdrawCourseZodSchema = z.object({
  body: z.object({
    offeredCourseId: z.string({
      required_error: 'Offered course id is required',
    }),
    offeredCourseSectionId: z.string({
      required_error: 'Offered course Section id is required',
    }),
  }),
});

export const registerdSemesterValidation = {
  registerdSemesterZodSchema,
  enrollOrWithdrawCourseZodSchema,
};
