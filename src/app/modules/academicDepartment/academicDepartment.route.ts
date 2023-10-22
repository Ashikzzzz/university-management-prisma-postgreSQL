import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentZodValidation } from './academicDepartment.validation';

const router = express.Router();

// get single department
router.get('/:id', academicDepartmentController.getAsingleDepartment);

// get all department
router.get('/', academicDepartmentController.getAllDepartments);

// create academicDepartment
router.post(
  '/create-academic-department',
  validateRequest(academicDepartmentZodValidation.academicDepartmentZodSchema),
  academicDepartmentController.createAcademicDepartment
);

// update department
router.patch('/:id', academicDepartmentController.updateAcademicDepartment);

export const academicDepartmentRoute = router;
