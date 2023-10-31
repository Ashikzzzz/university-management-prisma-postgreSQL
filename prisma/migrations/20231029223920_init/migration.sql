-- AddForeignKey
ALTER TABLE "student_registration_course" ADD CONSTRAINT "student_registration_course_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "senester_registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_registration_course" ADD CONSTRAINT "student_registration_course_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_registration_course" ADD CONSTRAINT "student_registration_course_offeredCourseId_fkey" FOREIGN KEY ("offeredCourseId") REFERENCES "offered_course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_registration_course" ADD CONSTRAINT "student_registration_course_offeredCourseSectionId_fkey" FOREIGN KEY ("offeredCourseSectionId") REFERENCES "offered_course_section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
