import express from 'express';
import { courseController } from './course.controller';

const router = express.Router();

// get all course
router.get('/', courseController.getAllCourses);

// create a course
router.post('/create-course', courseController.createCourse);

export const courseRoute = router;
