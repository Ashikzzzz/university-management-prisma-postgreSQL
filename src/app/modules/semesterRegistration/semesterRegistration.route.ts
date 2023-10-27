import express from 'express';
import { semesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

// get single registered semester
router.get('/:id', semesterRegistrationController.getAsingleRegisterdSemester);

// get all registerd semester
router.get('/', semesterRegistrationController.getAllRegisteredSemeter);

// create semesterRegistration
router.post(
  '/create-registration',
  semesterRegistrationController.createSemesterRegistration
);

export const semesterRegistrationRoute = router;
