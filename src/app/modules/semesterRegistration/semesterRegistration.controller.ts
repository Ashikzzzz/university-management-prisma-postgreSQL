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

// student semester reg
const startMyRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await semesterRegistrationService.startMyRegistration(
    user.userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student semester registration Successful',
    data: result,
  });
});

// enroll course
const enrollCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  console.log(user);
  const result = await semesterRegistrationService.enrollCourse(
    user.userId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student semester registration Successful',
    data: result,
  });
});

// withdraw from course
const withdrawCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  console.log(user);
  const result = await semesterRegistrationService.withdrawCourse(
    user.userId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student course withdraw Successful',
    data: result,
  });
});

// confirm registration
const confirmRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  console.log(user);
  const result = await semesterRegistrationService.confirmRegistration(
    user.userId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'confirm registration Successful',
    data: result,
  });
});

// get my registration
const getMyRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  console.log(user);
  const result = await semesterRegistrationService.getMyRegistration(
    user.userId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Successful',
    data: result,
  });
});

// start semester
const startSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  const result = await semesterRegistrationService.startSemester(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Successful',
    data: result,
  });
});

export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllRegisteredSemeter,
  getAsingleRegisterdSemester,
  deleteRegisterdSemester,
  updateRegisterdSemester,
  startMyRegistration,
  enrollCourse,
  withdrawCourse,
  confirmRegistration,
  getMyRegistration,
  startSemester,
};
