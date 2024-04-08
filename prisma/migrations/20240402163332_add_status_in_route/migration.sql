/*
  Warnings:

  - Added the required column `status` to the `Rota` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rota" ADD COLUMN     "status" TEXT NOT NULL;
