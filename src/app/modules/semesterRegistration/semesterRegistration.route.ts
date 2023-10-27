import express from 'express';
import { semesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

// create semesterRegistration
router.post(
  '/create-registration',
  semesterRegistrationController.createSemesterRegistration
);

export const semesterRegistrationRoute = router;
