import { SemesterRegistration } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { semesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result = await semesterRegistrationService.createSemesterRegistration(
      req.body
    );
    // console.log(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester registration create Successful',
      data: result,
    });
  }
);

// get all registerd semester
const getAllRegisteredSemeter = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, [
      'searchTerm',
      'status',
      'startDate',
      'endDate',
    ]);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await semesterRegistrationService.getAllRegisteredSemeter(
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
  }
);

const getAsingleRegisterdSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await semesterRegistrationService.getAsingleRegisterdSemester(id);
    sendResponse<SemesterRegistration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Successful',
      data: result,
    });
  }
);

const deleteRegisterdSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await semesterRegistrationService.deleteRegisterdSemester(
      id
    );
    sendResponse<SemesterRegistration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Successful',
      data: result,
    });
  }
);

const updateRegisterdSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result = await semesterRegistrationService.updateRegisterdSemester(
      id,
      data
    );
    sendResponse<SemesterRegistration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'update Successful',
      data: result,
    });
  }
);

export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllRegisteredSemeter,
  getAsingleRegisterdSemester,
  deleteRegisterdSemester,
  updateRegisterdSemester,
};
