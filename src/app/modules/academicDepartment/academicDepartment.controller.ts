import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentService } from './academicDepartment.service';

// create academic department
const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentService.createAcademicDepartment(
      req.body
    );
    // console.log(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'department create Successful',
      data: result,
    });
  }
);

// get all department
const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await academicDepartmentService.getAllDepartments(
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

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllDepartments,
};
