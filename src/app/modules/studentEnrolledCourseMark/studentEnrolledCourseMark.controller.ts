import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { stuentEnrolledCourseMarkService } from './studentEnrolledCourseMark.service';

const updateMarks = catchAsync(async (req: Request, res: Response) => {
  const result = await stuentEnrolledCourseMarkService.updateMarks(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update Successful',
    data: result,
  });
});

export const stuentEnrolledCourseMarkController = {
  updateMarks,
};
