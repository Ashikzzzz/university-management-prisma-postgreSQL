import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { studentController } from './student.controller';
import { studentZodValidation } from './student.validation';

const router = express.Router();

// create student
router.post(
  '/create-student',
  validateRequest(studentZodValidation.studentZodSchema),
  studentController.createStudent
);

export const studentRoute = router;
