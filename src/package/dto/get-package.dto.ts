import { ApiProperty } from "@nestjs/swagger";

export class GetPackageDto {
    @ApiProperty({
        description: 'Id do pacote',
        example: '07e1a857-485f-426b-88e1-492319f416a3'
    })
    id: string;

    @ApiProperty({
        description: 'Origem do pacote',
        example: 'Rua A, 123 - São Paulo'
    })
    origem: string;

    @ApiProperty({
        description: 'Destino do pacote',
        example: 'Rua B, 456 - São Paulo'
    })
    destino: string;

    @ApiProperty({
        description: 'Status do pacote',
        example: 'A CAMINHO'
    })
    status: string;

    @ApiProperty({
        description: 'Código de rastreio do pacote',
        example: 'A1B2C3D4E5F6G7H8'
    })
    codigo_Rastreio: string;

    @ApiProperty({
        description: 'Data de criação do pacote',
        example: '2021-09-25T15:00:00.000Z'
    })
    data_Criacao: string;

    @ApiProperty({
        description: 'Data de atualização do pacote',
        example: '2021-09-25T15:00:00.000Z'
    })
    data_Atualizacao: string;

    @ApiProperty({
        description: 'Cliente vinculado ao pacote',
        example: {
            id: '07e1a857-485f-426b-88e1-492319f416a3',
            nome: 'João da Silva',
            cpf: '12345678900',
            email: 'teste@track.com',
        }
    })
    cliente: {
        id: string;
        nome: string;
        cpf: string;
        email: string;
    };

    @ApiProperty({
        description: 'Motorista vinculado ao pacote',
        example: {
            id: '07e1a857-485f-426b-88e1-492319f416a3',
            nome: 'João da Silva',
            cnh: '12345678900',
            email: 'teste@track.go',
        }
    })
    motorista?: {
        id: string;
        nome: string;
        cnh: string;
        email: string;
    };

    @ApiProperty({
        description: 'Data entrega pacote',
        example: '2021-09-25T15:00:00.000Z'
    })
    data_Entrega?: string;
}