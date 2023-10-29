import express from 'express';
import { courseClassScheduleController } from './offeredCourseClassSchedule.controller';

const router = express.Router();

// delete
router.delete('/:id', courseClassScheduleController.deleteClassSchedule);

// update
router.patch('/:id', courseClassScheduleController.updateClassSchedule);

// get single
router.get('/:id', courseClassScheduleController.getASingleClassSchedule);

// get all
router.get('/', courseClassScheduleController.getAllOfferdCourseSchedule);
// create
router.post(
  '/create-class-schedule',
  courseClassScheduleController.createCourseClassSchedule
);

export const courseClassScheduleRoute = router;
