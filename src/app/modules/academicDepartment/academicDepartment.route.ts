import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentZodValidation } from './academicDepartment.validation';

const router = express.Router();

// get all department
router.get('/', academicDepartmentController.getAllDepartments);

// create academicDepartment
router.post(
  '/create-academic-department',
  validateRequest(academicDepartmentZodValidation.academicDepartmentZodSchema),
  academicDepartmentController.createAcademicDepartment
);

export const academicDepartmentRoute = router;
