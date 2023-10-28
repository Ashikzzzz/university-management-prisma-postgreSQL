import express from 'express';
import { offeredCourseController } from './offeredCourse.controller';

const router = express.Router();

// create
router.post(
  '/create-offered-course',
  offeredCourseController.createOfferedCourse
);

export const offeredCourseRoute = router;
