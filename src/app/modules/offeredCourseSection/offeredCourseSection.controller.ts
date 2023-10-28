import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { courseSectionService } from './offeredCourseSection.service';

// create a course section
const createCourseSection = catchAsync(async (req: Request, res: Response) => {
  const result = await courseSectionService.createCourseSection(req.body);
  // console.log(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course create Successful',
    data: result,
  });
});

export const courseSectionController = {
  createCourseSection,
};
