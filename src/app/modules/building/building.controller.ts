import { Building } from '@prisma/client';
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
    data: result.data,
    meta: result.meta,
  });
});

// update a building
const updateABuilding = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await buildingService.updateABuilding(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'building update  Successful',
    data: result,
  });
});

// get a single building
const getAsingleBuilding = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await buildingService.getAsingleBuilding(id);
  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Successful',
    data: result,
  });
});

// delete a building
const deleteBuilding = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await buildingService.deleteBuilding(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Successful',
    data: result,
  });
});

export const buildingController = {
  createBuilding,
  getAllBuilding,
  updateABuilding,
  getAsingleBuilding,
  deleteBuilding,
};
