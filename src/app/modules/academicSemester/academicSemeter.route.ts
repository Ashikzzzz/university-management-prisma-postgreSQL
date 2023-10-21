import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterZodValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(academicSemesterZodValidation.academicSemesterZodSchema),
  academicSemesterController.createAcademicSemester
);

export const academicSemesterRoute = router;
