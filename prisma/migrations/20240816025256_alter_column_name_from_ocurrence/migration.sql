/*
  Warnings:

  - You are about to drop the column `userId` on the `Ocurrence` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Ocurrence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ocurrence" DROP CONSTRAINT "Ocurrence_userId_fkey";

-- AlterTable
ALTER TABLE "Ocurrence" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Ocurrence" ADD CONSTRAINT "Ocurrence_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
