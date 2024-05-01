import { ApiProperty } from "@nestjs/swagger";

export class DashboardReportDTO {
    @ApiProperty({
        description: 'Total Entregas',
        example: 10
    })
    totalEntregas: number;

    @ApiProperty({
        description: 'Entregas em andamento',
        example: 2
    })
    entregasAndamento: number;

    @ApiProperty({
        description: 'Entregas finalizadas',
        example: 8
    })
    entregasFinalizadas: number;

    @ApiProperty({
        description: 'Entregas esperando coleta',
        example: 0
    })
    entregasEsperandoColeta: number;

    @ApiProperty({
        description: 'Motoristas cadastrados',
        example: 0
    })
    motoristasCadastrados: number;

    @ApiProperty({
        description: 'Clientes cadastrados',
        example: 0
    })
    clientesCadastrados: number;

    @ApiProperty({
        description: 'Motoristas disponiveis para entrega',
        example: 0
    })
    motoristasDisponiveis: number;

    @ApiProperty({
        description: 'Motoristas em entrega',
        example: 0
    })
    motoristasEmEntrega: number;
}