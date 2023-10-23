import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { buildingService } from './building.service';

// create a building
const createBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await buildingService.createBuilding(req.body);
  // console.log(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building create Successful',
    data: result,
  });
});

export const buildingController = {
  createBuilding,
};
