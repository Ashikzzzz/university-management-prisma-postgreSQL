import express from 'express';
import { courseSectionController } from './offeredCourseSection.controller';

const router = express.Router();

// delete
router.delete('/:id', courseSectionController.deleteCourseSection);

// update
router.patch('/:id', courseSectionController.updateCourseSection);

// get a single course section
router.get('/:id', courseSectionController.singleCourseSection);
// get all
router.get('/', courseSectionController.getAllCourseSection);

// create course section
router.post(
  '/create-course-section',
  courseSectionController.createCourseSection
);

export const courseSectionRoute = router;
