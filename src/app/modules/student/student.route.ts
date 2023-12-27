import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { studentController } from './student.controller';
import { studentZodValidation } from './student.validation';

const router = express.Router();

// get single studnet
router.get('/:id', studentController.getAsingleStudent);

// get all student
router.get('/', studentController.getAllStudents);

// my courses

router.get(
  '/my-courses',
  auth(ENUM_USER_ROLE.STUDENT),
  studentController.myCourses
);

// get my academic performance
router.get(
  '/my-academic-info',
  auth(ENUM_USER_ROLE.STUDENT),
  studentController.academicInfoData
);

// get my course schedule
router.get(
  '/get-course-routine',
  auth(ENUM_USER_ROLE.STUDENT),
  studentController.getMyCourseSchedule
);

// create student
router.post(
  '/create-student',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(studentZodValidation.studentZodSchema),
  studentController.createStudent
);

// update a student
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  studentController.updateAStudent
);

// delete a student
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  studentController.deleteStudent
);

export const studentRoute = router;
