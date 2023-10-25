import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { courseService } from './course.service';

// create a course
const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await courseService.createCourse(req.body);
  // console.log(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course create Successful',
    data: result,
  });
});

// get all course
const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'code']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await courseService.getAllCourses(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Successful',
    data: result.data,
    meta: result.meta,
  });
});

export const courseController = {
  createCourse,
  getAllCourses,
};
