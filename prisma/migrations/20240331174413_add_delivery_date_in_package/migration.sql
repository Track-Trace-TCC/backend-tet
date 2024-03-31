-- AlterTable
ALTER TABLE "Entrega" ADD COLUMN     "dataHoraEntrega" TIMESTAMP(3),
ALTER COLUMN "origem" DROP NOT NULL;
