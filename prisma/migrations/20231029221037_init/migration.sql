-- CreateTable
CREATE TABLE "student_registration_course" (
    "semesterRegistrationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "offeredCourseId" TEXT NOT NULL,
    "offeredCourseSectionId" TEXT NOT NULL,

    CONSTRAINT "student_registration_course_pkey" PRIMARY KEY ("semesterRegistrationId","studentId","offeredCourseId")
);
