import express from 'express';
import { courseClassScheduleController } from './offeredCourseClassSchedule.controller';

const router = express.Router();
// get all
router.get('/', courseClassScheduleController.getAllOfferdCourseSchedule);
// create
router.post(
  '/create-class-schedule',
  courseClassScheduleController.createCourseClassSchedule
);

export const courseClassScheduleRoute = router;
