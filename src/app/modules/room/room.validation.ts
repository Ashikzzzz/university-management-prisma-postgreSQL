import { z } from 'zod';

const roomZodSchema = z.object({
  body: z.object({
    roomNumber: z.string({
      required_error: 'roomNumber is Required',
    }),
    floor: z.string({
      required_error: 'floor is required',
    }),
    buildingId: z.string({
      required_error: 'buildingId is required',
    }),
  }),
});

export const roomValidation = {
  roomZodSchema,
};
