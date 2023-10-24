-- CreateTable
CREATE TABLE "course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseToPreRequisite" (
    "courseId" TEXT NOT NULL,
    "preRequisiteId" TEXT NOT NULL,

    CONSTRAINT "CourseToPreRequisite_pkey" PRIMARY KEY ("courseId","preRequisiteId")
);

-- AddForeignKey
ALTER TABLE "CourseToPreRequisite" ADD CONSTRAINT "CourseToPreRequisite_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseToPreRequisite" ADD CONSTRAINT "CourseToPreRequisite_preRequisiteId_fkey" FOREIGN KEY ("preRequisiteId") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
