import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationController } from './semesterRegistration.controller';
import { registerdSemesterValidation } from './semesterRegistration.validation';

const router = express.Router();

// get single registered semester
router.get('/:id', semesterRegistrationController.getAsingleRegisterdSemester);

// delete registerd semester
router.delete('/:id', semesterRegistrationController.deleteRegisterdSemester);

// update registered semester
router.patch('/:id', semesterRegistrationController.updateRegisterdSemester);

// get all registerd semester
router.get('/', semesterRegistrationController.getAllRegisteredSemeter);

// create semesterRegistration
router.post(
  '/create-registration',
  validateRequest(registerdSemesterValidation.registerdSemesterZodSchema),
  semesterRegistrationController.createSemesterRegistration
);

export const semesterRegistrationRoute = router;
