/*
  Warnings:

  - You are about to drop the column `ocurrence_id` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_ocurrence_id_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "ocurrence_id";
