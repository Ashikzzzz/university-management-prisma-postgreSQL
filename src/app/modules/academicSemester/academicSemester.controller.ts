import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.createAcademicSemester(
      req.body
    );
    sendResponse<AcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester create Successful',
      data: result,
    });
  }
);

// get all semester

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [
    'searchTerm',
    'code',
    'title',
    'startMonth',
    'endMonth',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await academicSemesterService.getAllSemesters(
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

// get a single academic semester
const getAsingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicSemesterService.getAsingleSemester(id);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester create Successful',
    data: result,
  });
});

// update semester
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await academicSemesterService.updateSemester(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Successful',
    data: result,
  });
});

// delete a semester
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicSemesterService.deleteSemester(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Successful',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAllSemesters,
  getAsingleSemester,
  updateSemester,
  deleteSemester,
};
