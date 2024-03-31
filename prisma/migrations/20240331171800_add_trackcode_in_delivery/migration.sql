/*
  Warnings:

  - Added the required column `codigoRastreio` to the `Entrega` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entrega" ADD COLUMN     "codigoRastreio" TEXT NOT NULL,
ALTER COLUMN "dataHoraCriacao" SET DEFAULT CURRENT_TIMESTAMP;
