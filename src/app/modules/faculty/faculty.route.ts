import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { facultyController } from './faculty.controller';
import { facultyZodValidation } from './faculty.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// assign a course
router.post(
  '/:id/assign-courses',
  validateRequest(facultyZodValidation.assignOrRemoveCourses),
  facultyController.assignCourseToFaculty
);

// delete course from faculty
router.delete(
  '/:id/remove-course',
  validateRequest(facultyZodValidation.assignOrRemoveCourses),
  facultyController.deleteCourseFromFaculty
);

// get a single faculty
router.get('/:id', facultyController.getAsingleFaculty);

// get all faculty
router.get('/', facultyController.getAllFaculty);

// create faculty
router.post(
  '/create-faculty',
  validateRequest(facultyZodValidation.facultyZodSchema),
  facultyController.createFaculty
);

// update a faculty
router.patch('/:id', facultyController.updateAFaculty);

// delete a faculty
router.delete('/:id', facultyController.deleteFaculty);

// my courses
router.get(
  '/my-courses',
  auth(ENUM_USER_ROLE.FACULTY),
  facultyController.myCourses
);

export const facultyRoute = router;
