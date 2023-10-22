import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyZodValidation } from './academicFaculty.validation';

const router = express.Router();

// create academic faculty
router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyZodValidation.academicFacultyZodSchema),
  academicFacultyController.createAcademicFaculty
);

export const academicFacultyRoute = router;
