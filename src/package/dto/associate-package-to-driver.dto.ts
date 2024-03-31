import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";

class Localizacao {
    @IsNotEmpty()
    @IsString()
    latitude: string;

    @IsNotEmpty()
    @IsString()
    longitude: string;
}
export class AssociatePackageToDriver {
    @ApiProperty({
        description: 'Identificador do motorista',
        example: '07e1a857-485f-426b-88e1-492319f416a3'
    })
    @IsUUID()
    @IsNotEmpty()
    @IsString()
    idMotorista: string;

    @ApiProperty({
        description: 'Lista de identificadores dos pacotes',
        example: ['07e1a857-485f-426b-88e1-492319f416a3']
    })
    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('4', { each: true })
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
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Localizacao)
    localizacao: Localizacao;
}

