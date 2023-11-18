import express from 'express';
import { stuentEnrolledCourseMarkController } from './studentEnrolledCourseMark.controller';

const router = express.Router();

// update mark
router.patch('/update-mark', stuentEnrolledCourseMarkController.updateMarks);

// update grade for mid+final
router.patch(
  '/update-total-mark',
  stuentEnrolledCourseMarkController.updateTotalMarks
);

export const stuentEnrolledCourseMarkRoute = router;
