import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { offeredCourseController } from './offeredCourse.controller';
import { OfferedCourseValidations } from './offeredCourse.validation';

const router = express.Router();

// delete offered course
router.delete('/:id', offeredCourseController.deleteOfferedCourse);

// update
router.patch(
  '/update-offered-course/:id',
  offeredCourseController.updateOfferedCourse
);

// get single
router.get('/:id', offeredCourseController.getSingleOfferedCourse);

// get all
router.get('/', offeredCourseController.getAllOfferedCourse);

// create
router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.offeredZodSchema),
  offeredCourseController.createOfferedCourse
);

export const offeredCourseRoute = router;
