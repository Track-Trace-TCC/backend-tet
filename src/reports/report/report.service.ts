import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { DashboardReportDTO } from './dto/dashboard-report.dto';

@Injectable()
export class ReportService {
    constructor(private prisma: PrismaService) { }

    async getDashboardReport(): Promise<DashboardReportDTO> {
        const entregasAndamento = await this.prisma.entrega.count({
            where: {
                status: 'A_CAMINHO'
            }
        });
        const entregasConcluidas = await this.prisma.entrega.count({
            where: {
                status: 'CONCLUIDO'
            }
        });
        const entregasEsperandoColeta = await this.prisma.entrega.count({
            where: {
                status: 'ESPERANDO_RETIRADA'
            }
        });
        const totalEntregas = entregasAndamento + entregasConcluidas + entregasEsperandoColeta;
        const motoristasCadastrados = await this.prisma.motorista.count();
        const clientesCadastrados = await this.prisma.cliente.count();
        const motoristasEmEntrega = await this.prisma.motorista.count({
            where: {
                Rotas: {
                    none: {
                        status: 'EM TRANSITO',
                    },
                },
            },
        });
        const motoristasDisponiveis = await this.prisma.motorista.count() - motoristasEmEntrega;

        return {
            totalEntregas: totalEntregas,
            entregasAndamento: entregasAndamento,
            entregasFinalizadas: entregasConcluidas,
            entregasEsperandoColeta: entregasEsperandoColeta,
            motoristasCadastrados: motoristasCadastrados,
            clientesCadastrados: clientesCadastrados,
            motoristasDisponiveis: motoristasDisponiveis,
            motoristasEmEntrega: motoristasEmEntrega,
        }
    }
}
