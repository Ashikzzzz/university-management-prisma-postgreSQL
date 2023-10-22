import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { studentController } from './student.controller';
import { studentZodValidation } from './student.validation';

const router = express.Router();

// get single studnet
router.get('/:id', studentController.getAsingleStudent);

// get all student
router.get('/', studentController.getAllStudents);

// create student
router.post(
  '/create-student',
  validateRequest(studentZodValidation.studentZodSchema),
  studentController.createStudent
);

// update a student
router.patch('/:id', studentController.updateAStudent);

export const studentRoute = router;
