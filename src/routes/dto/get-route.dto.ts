import { ApiProperty } from "@nestjs/swagger";

class Localizacao {
    @ApiProperty({
        description: 'Nome da localização',
        example: 'Ponto de partida',
    })
    name: string;

    @ApiProperty({
        description: 'Latitude da localização',
        example: '-23.5505199',
    })
    lat: number;

    @ApiProperty({
        description: 'Longitude da localização',
        example: '-46.6333094',
    })
    lng: number;
}

class Motorista {
    @ApiProperty({
        description: 'Id do motorista',
        example: '07e1a857-485f-426b-88e1-492319f416a3',
    })
    id: string;

    @ApiProperty({
        description: 'Nome do motorista',
        example: 'João da Silva',
    })
    nome: string;

    @ApiProperty({
        description: 'CNH do motorista',
        example: '12345678900',
    })
    cnh: string;

    @ApiProperty({
        description: 'Email do motorista',
        example: 'teste@track.go',
    })
    email: string;
}

export class GetRouteDto {

    @ApiProperty({
        description: 'Id da rota',
        example: '07e1a857-485f-426b-88e1-492319f416a3',
    })
    id: string;

    @ApiProperty({
        description: 'Nome da rota',
        example: 'Track & Trace Route +2023-03-28T12:00:00.000Z 07e1a857-485f-426b-88e1-492319f416a3',
    })
    name: string;

    @ApiProperty({
        description: 'Duração prevista da rota, em segundos',
        example: 3600,
    })
    duration: number;

    @ApiProperty({
        description: 'Origem da rota',
        type: Localizacao,
    })
    source: Localizacao;

    @ApiProperty({
        description: 'Destino da rota',
        type: Localizacao,
    })
    destination: Localizacao;

    @ApiProperty({
        description: 'Status da rota',
        example: 'IN_TRANSIT',
    })
    status: string;

    @ApiProperty({
        description: 'Informações detalhadas das direções da rota, incluindo modos de viagem disponíveis, waypoints geocodificados, rotas e solicitação.',
        example: '{}',
    })
    directions: string;

    @ApiProperty({
        description: 'Informações do motorista vinculado à rota',
        type: Motorista,
    })
    motorista: Motorista;
}
