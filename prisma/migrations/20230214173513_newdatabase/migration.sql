/*
  Warnings:

  - Added the required column `userImage` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userImage" VARCHAR(255) NOT NULL;
