import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { stuentEnrolledCourseMarkService } from './studentEnrolledCourseMark.service';
import pick from '../../../shared/pick';
import { studentEnrolledCourseMarkFilterableFields } from './studentEnrolledCourseMark.interface';

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

// get all from db
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentEnrolledCourseMarkFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await stuentEnrolledCourseMarkService.getAllFromDB(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student course marks fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const stuentEnrolledCourseMarkController = {
  updateMarks,
  updateTotalMarks,
  getAllFromDB,
};
