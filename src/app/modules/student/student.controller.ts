import { Student } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentService } from './student.service';

// create student
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await studentService.createStudent(req.body);
  // console.log(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student create Successful',
    data: result,
  });
});

// get all student
const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [
    'searchTerm',
    'firstName',
    'email',
    'contactNo',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await studentService.getAllStudents(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Successful',
    data: result.data,
    meta: result.meta,
  });
});

// get single student
const getAsingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await studentService.getAsingleStudent(id);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Successful',
    data: result,
  });
});

// update single student
const updateAStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await studentService.updateAStudent(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Successful',
    data: result,
  });
});

export const studentController = {
  createStudent,
  getAllStudents,
  getAsingleStudent,
  updateAStudent,
};
