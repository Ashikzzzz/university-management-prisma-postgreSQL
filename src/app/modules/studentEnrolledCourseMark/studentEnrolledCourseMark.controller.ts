import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { stuentEnrolledCourseMarkService } from './studentEnrolledCourseMark.service';

// update student marks for final or mid
const updateMarks = catchAsync(async (req: Request, res: Response) => {
  const result = await stuentEnrolledCourseMarkService.updateMarks(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update Successful',
    data: result,
  });
});

// update grade for mid+final
const updateTotalMarks = catchAsync(async (req: Request, res: Response) => {
  const result = await stuentEnrolledCourseMarkService.updateTotalMarks(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update total marks Successful',
    data: result,
  });
});

export const stuentEnrolledCourseMarkController = {
  updateMarks,
  updateTotalMarks,
};
