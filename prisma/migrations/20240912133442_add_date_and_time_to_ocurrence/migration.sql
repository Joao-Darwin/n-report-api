/*
  Warnings:

  - Added the required column `date` to the `Ocurrence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Ocurrence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Ocurrence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ocurrence" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
