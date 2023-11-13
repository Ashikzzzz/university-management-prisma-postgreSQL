import express from 'express';
import { stuentEnrolledCourseMarkController } from './studentEnrolledCourseMark.controller';

const router = express.Router();

// update mark
router.patch('/update-mark', stuentEnrolledCourseMarkController.updateMarks);

export const stuentEnrolledCourseMarkRoute = router;
