import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationController } from './semesterRegistration.controller';
import { registerdSemesterValidation } from './semesterRegistration.validation';

const router = express.Router();

router.post(
  '/withdraw-course',
  auth(ENUM_USER_ROLE.STUDENT),
  semesterRegistrationController.withdrawCourse
);

// student semester reg
router.post(
  '/start-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  semesterRegistrationController.startMyRegistration
);

// enroll course
router.post(
  '/enroll-course',
  auth(ENUM_USER_ROLE.STUDENT),
  semesterRegistrationController.enrollCourse
);

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
