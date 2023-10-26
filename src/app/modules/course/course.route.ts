import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseController } from './course.controller';
import { courseZodValidation } from './course.validation';

const router = express.Router();
// delete a course
router.delete('/delete-course/:id', courseController.deleteCourse);

// get single course
router.get('/:id', courseController.getSingleCourse);

// get all course
router.get('/', courseController.getAllCourses);

// update course
router.patch('/:id', courseController.updateCourse);

// create a course
router.post(
  '/create-course',
  validateRequest(courseZodValidation.courseZodSchema),
  courseController.createCourse
);

export const courseRoute = router;
