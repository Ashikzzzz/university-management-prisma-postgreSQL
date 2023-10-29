import express from 'express';
import { academicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { academicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { academicSemesterRoute } from '../modules/academicSemester/academicSemeter.route';
import { buildingRoute } from '../modules/building/building.route';
import { courseRoute } from '../modules/course/course.route';
import { facultyRoute } from '../modules/faculty/faculty.route';
import { offeredCourseRoute } from '../modules/offeredCourse/offeredCourse.route';
import { courseClassScheduleRoute } from '../modules/offeredCourseClassSchedule/offeredCourseClassSchedule.route';
import { courseSectionRoute } from '../modules/offeredCourseSection/offeredCourseSection.route';
import { roomRoute } from '../modules/room/room.route';
import { semesterRegistrationRoute } from '../modules/semesterRegistration/semesterRegistration.route';
import { studentRoute } from '../modules/student/student.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semester',
    route: academicSemesterRoute,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRoute,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRoute,
  },
  {
    path: '/student',
    route: studentRoute,
  },
  {
    path: '/faculty',
    route: facultyRoute,
  },
  {
    path: '/building',
    route: buildingRoute,
  },
  {
    path: '/rooms',
    route: roomRoute,
  },
  {
    path: '/courses',
    route: courseRoute,
  },
  {
    path: '/semester-registration',
    route: semesterRegistrationRoute,
  },
  {
    path: '/offered-courses',
    route: offeredCourseRoute,
  },
  {
    path: '/course-section',
    route: courseSectionRoute,
  },
  {
    path: '/course-schedule',
    route: courseClassScheduleRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
