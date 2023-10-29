import express from 'express';
import { courseClassScheduleController } from './offeredCourseClassSchedule.controller';

const router = express.Router();

// create
router.post(
  '/create-class-schedule',
  courseClassScheduleController.createCourseClassSchedule
);

export const courseClassScheduleRoute = router;
