/*
  Warnings:

  - Made the column `role_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role_id" SET NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL;
