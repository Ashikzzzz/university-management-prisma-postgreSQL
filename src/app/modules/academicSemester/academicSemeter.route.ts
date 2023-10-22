import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterZodValidation } from './academicSemester.validation';

const router = express.Router();

// get a single semester
router.get('/:id', academicSemesterController.getAsingleSemester);

// get all semester
router.get('/', academicSemesterController.getAllSemesters);

router.post(
  '/create-semester',
  validateRequest(academicSemesterZodValidation.academicSemesterZodSchema),
  academicSemesterController.createAcademicSemester
);

// update semester
router.patch('/:id', academicSemesterController.updateSemester);

// delete a semester
router.delete('/:id', academicSemesterController.deleteSemester);

export const academicSemesterRoute = router;
