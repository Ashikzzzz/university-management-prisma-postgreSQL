/*
  Warnings:

  - You are about to drop the column `endData` on the `senester_registration` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `senester_registration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "senester_registration" DROP COLUMN "endData",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL;
