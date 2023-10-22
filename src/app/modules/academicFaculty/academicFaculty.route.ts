import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyZodValidation } from './academicFaculty.validation';

const router = express.Router();

// get a single faculty
router.get('/:id', academicFacultyController.getAsingleFaculty);

// get all academic faculty
router.get('/', academicFacultyController.getAllFaculty);

// create academic faculty
router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyZodValidation.academicFacultyZodSchema),
  academicFacultyController.createAcademicFaculty
);

// update a academic faculty
router.patch('/:id', academicFacultyController.updateAcademicFaculty);

export const academicFacultyRoute = router;
