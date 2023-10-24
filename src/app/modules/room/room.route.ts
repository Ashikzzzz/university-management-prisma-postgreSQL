import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { roomController } from './room.controller';
import { roomValidation } from './room.validation';

const router = express.Router();

router.post(
  '/create-room',
  validateRequest(roomValidation.roomZodSchema),
  roomController.createRoom
);

export const roomRoute = router;
