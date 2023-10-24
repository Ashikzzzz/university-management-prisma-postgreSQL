/*
  Warnings:

  - You are about to drop the `CourseToPreRequisite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseToPreRequisite" DROP CONSTRAINT "CourseToPreRequisite_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseToPreRequisite" DROP CONSTRAINT "CourseToPreRequisite_preRequisiteId_fkey";

-- DropTable
DROP TABLE "CourseToPreRequisite";
