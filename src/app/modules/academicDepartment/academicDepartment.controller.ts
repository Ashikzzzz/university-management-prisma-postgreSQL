import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
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

export const academicDepartmentController = {
  createAcademicDepartment,
};
