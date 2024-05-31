-- AlterTable
ALTER TABLE "Entrega" ADD COLUMN     "route_id" TEXT;

-- AlterTable
ALTER TABLE "Motorista" ALTER COLUMN "senha" DROP DEFAULT,
ALTER COLUMN "senha" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Rota"("id_Rota") ON DELETE SET NULL ON UPDATE CASCADE;
