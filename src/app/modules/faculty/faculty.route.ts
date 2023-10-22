import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { facultyController } from './faculty.controller';
import { facultyZodValidation } from './faculty.validation';

const router = express.Router();

// get a single faculty
router.get('/:id', facultyController.getAsingleFaculty);

// get all faculty
router.get('/', facultyController.getAllFaculty);

// create faculty
router.post(
  '/create-faculty',
  validateRequest(facultyZodValidation.facultyZodSchema),
  facultyController.createFaculty
);

// update a faculty
router.patch('/:id', facultyController.updateAFaculty);

// delete a faculty
router.delete('/:id', facultyController.deleteFaculty);

export const facultyRoute = router;
