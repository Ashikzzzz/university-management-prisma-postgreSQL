import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { facultyController } from './faculty.controller';
import { facultyZodValidation } from './faculty.validation';

const router = express.Router();

// create faculty
router.post(
  '/create-faculty',
  validateRequest(facultyZodValidation.facultyZodSchema),
  facultyController.createFaculty
);

export const facultyRoute = router;
