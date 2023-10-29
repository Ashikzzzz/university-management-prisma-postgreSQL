import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { courseClassScheduleService } from './offeredCourseClassSchedule.service';

const createCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const result = await courseClassScheduleService.createCourseClassSchedule(
      req.body
    );
    // console.log(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'offered course create Successful',
      data: result,
    });
  }
);

// get all
const getAllOfferdCourseSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, [
      'searchTerm',
      'offeredCourseSectionId',
      'semesterRegistrationId',
      'roomId',
      'facultyId',
    ]);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await courseClassScheduleService.getAllOfferdCourseSchedule(
      filters,
      options
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourse class schedule fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// find single
const getASingleClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await courseClassScheduleService.getASingleClassSchedule(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' fetched successfully',
      data: result,
    });
  }
);

// update
const updateClassSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await courseClassScheduleService.updateClassSchedule(
    id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' updated successfully',
    data: result,
  });
});

// delete
const deleteClassSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await courseClassScheduleService.deleteClassSchedule(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' deleted successfully',
    data: result,
  });
});

export const courseClassScheduleController = {
  createCourseClassSchedule,
  getAllOfferdCourseSchedule,
  getASingleClassSchedule,
  updateClassSchedule,
  deleteClassSchedule,
};
