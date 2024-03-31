import { ApiProperty } from "@nestjs/swagger";

export class GetDriverDTO {
    @ApiProperty({
        description: 'ID do motorista',
        example: '07e1a857-485f-426b-88e1-492319f416a3'
    })
    id: string;

    @ApiProperty({
        description: 'Nome do motorista',
        example: 'João da Silva'
    })
    nome: string;

    @ApiProperty({
        description: 'CNH do motorista',
        example: '34637711444'
    })
    cnh: string;

    @ApiProperty({
        description: 'Email do motorista',
        example: 'teste@track.com'
    })
    email: string;

    @ApiProperty({
        description: 'Telefone do motorista',
        example: '+55 (11) 99999-9999'
    })
    telefone: string;

    @ApiProperty({
        description: 'Localização atual do motorista',
        example: {
            latitude: -23.5505199,
            longitude: -46.6333094
        }
    })
    localizacaoAtual: {
        latitude: number;
        longitude: number;
    };

    @ApiProperty({
        description: 'Entregas vinculadas ao motorista',
        example: [
            {
                id_Entrega: '07e1a857-485f-426b-88e1-492319f416a3',
                id_Cliente: '07e1a857-485f-426b-88e1-492319f416a3',
                codigo_Rastreio: '123456789',
                origem: 'Rua A',
                destino: 'Rua B',
                status: 'A CAMINHO',
                data_Criacao: '2021-09-25T15:00:00.000Z',
                data_Atualizacao: '2021-09-25T15:00:00.000Z',
            }
        ]
    })
    entregas: {
        id_Entrega: string;
        id_Cliente: string;
        codigo_Rastreio: string;
        origem: string;
        destino: string;
        status: string;
        data_Criacao: Date;
        data_Atualizacao: Date;
    }[];
}