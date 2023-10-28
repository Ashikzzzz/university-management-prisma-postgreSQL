import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
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

// get all offered course section
const getAllCourseSection = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'offeredCourseId']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await courseSectionService.getAllCourseSection(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Successful',
    data: result.data,
    meta: result.meta,
  });
});

// single course section
const singleCourseSection = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await courseSectionService.singleCourseSection(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourseSection fetched successfully',
    data: result,
  });
});

// update
const updateCourseSection = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await courseSectionService.updateCourseSection(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourseSection updated successfully',
    data: result,
  });
});

const deleteCourseSection = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await courseSectionService.deleteCourseSection(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourseSection deleted successfully',
    data: result,
  });
});

export const courseSectionController = {
  createCourseSection,
  getAllCourseSection,
  singleCourseSection,
  deleteCourseSection,
  updateCourseSection,
};
