import { Course } from '@prisma/client';
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

// get a single course
const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await courseService.getSingleCourse(id);
  sendResponse<Course>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Successful',
    data: result,
  });
});

// delete a course
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  const result = await courseService.deleteCourse(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Successful',
    data: result,
  });
});

// update a course
const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  console.log(id);
  const result = await courseService.updateCourse(id, data);
  sendResponse<Course>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Successful',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
};
