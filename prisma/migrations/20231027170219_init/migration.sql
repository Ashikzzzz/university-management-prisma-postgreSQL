-- CreateTable
CREATE TABLE "offered_course" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" TEXT NOT NULL,
    "academicDepartmentId" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,

    CONSTRAINT "offered_course_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offered_course" ADD CONSTRAINT "offered_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_course" ADD CONSTRAINT "offered_course_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_course" ADD CONSTRAINT "offered_course_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "senester_registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
