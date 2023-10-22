import { AcademicFaculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyService.createAcademicFaculty(req.body);
    sendResponse<AcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester create Successful',
      data: result,
    });
  }
);

// get all faculty

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await academicFacultyService.getAllFaculty(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Successful',
    data: result.data,
    meta: result.meta,
  });
});
// get a single academic faculty
const getAsingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicFacultyService.getAsingleFaculty(id);
  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Successful',
    data: result,
  });
});

// update a faculty
const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result = await academicFacultyService.updateAcademicFaculty(id, data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Successful',
      data: result,
    });
  }
);

export const academicFacultyController = {
  createAcademicFaculty,
  getAllFaculty,
  getAsingleFaculty,
  updateAcademicFaculty,
};
