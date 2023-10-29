import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { courseClassScheduleService } from './offeredCourseClassSchedule.service';

const createCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const result = await courseClassScheduleService.createCourseClassSchedule(
      req.body
    );
    // console.log(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'offered course create Successful',
      data: result,
    });
  }
);

export const courseClassScheduleController = {
  createCourseClassSchedule,
};
