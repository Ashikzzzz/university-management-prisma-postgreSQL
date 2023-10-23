import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
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

// get all building
const getAllBuilding = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await buildingService.getAllBuilding(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building create Successful',
    data: result,
  });
});

export const buildingController = {
  createBuilding,
  getAllBuilding,
};
