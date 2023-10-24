import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { roomService } from './room.service';

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await roomService.createRoom(req.body);
  // console.log(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room create Successful',
    data: result,
  });
});

export const roomController = {
  createRoom,
};
