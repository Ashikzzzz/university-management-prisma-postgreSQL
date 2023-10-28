import express from 'express';
import { courseSectionController } from './offeredCourseSection.controller';

const router = express.Router();

// create course section
router.post(
  '/create-course-section',
  courseSectionController.createCourseSection
);

export const courseSectionRoute = router;
