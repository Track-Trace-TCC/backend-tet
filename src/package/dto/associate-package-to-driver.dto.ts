import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";

export class Localizacao {
    @IsNotEmpty({ message: 'O campo "latitude" não pode estar vazio.' })
    @IsString({ message: 'O campo "latitude" deve ser uma string.' })
    latitude: string;

    @IsNotEmpty({ message: 'O campo "longitude" não pode estar vazio.' })
    @IsString({ message: 'O campo "longitude" deve ser uma string.' })
    longitude: string;
}
export class AssociatePackageToDriver {
    @ApiProperty({
        description: 'Identificador do motorista',
        example: '07e1a857-485f-426b-88e1-492319f416a3'
    })
    @IsUUID('4', { message: 'O campo "idMotorista" deve ser um UUID válido.' })
    @IsNotEmpty({ message: 'O campo "idMotorista" não pode estar vazio.' })
    @IsString({ message: 'O campo "idMotorista" deve ser uma string.' })
    idMotorista: string;

    @ApiProperty({
        description: 'Identificador da rota',
        example: '07e1a857-485f-426b-88e1-492319f416a3'
    })
    @IsUUID('4', { message: 'O campo "route_id" deve ser um UUID válido.' })
    @IsNotEmpty({ message: 'O campo "route_id" não pode estar vazio.' })
    @IsString({ message: 'O campo "route_id" deve ser uma string.' })
    route_id: string;

    @ApiProperty({
        description: 'Lista de identificadores dos pacotes',
        example: ['07e1a857-485f-426b-88e1-492319f416a3']
    })
    @IsArray({ message: 'O campo "packages_ids" deve ser um array.' })
    @ArrayNotEmpty({ message: 'O campo "packages_ids" não pode estar vazio.' })
    @IsUUID('4', { each: true, message: 'O campo "packages_ids" deve ser um array de UUIDs válidos.' })
    packages_ids: string[];

    @ApiProperty({
        description: 'Localização do motoristas',
        example: {
            latitude: '-23.5505199',
            longitude: '-46.6333094'
        }
    })
    @ApiProperty({
        description: 'Localização do motoristas',
        example: {
            latitude: '-23.5505199',
            longitude: '-46.6333094'
        }
    })
    @IsNotEmpty({ message: 'O campo "localizacao" não pode estar vazio.' })
    @ValidateNested({ message: 'O campo "localizacao" deve ser um objeto.' })
    @Type(() => Localizacao)
    localizacao: Localizacao;
}

