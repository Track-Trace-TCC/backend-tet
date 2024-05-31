import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsLatitude, IsLongitude, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";

class LocationDto {
    @ApiProperty({ example: '-23.550520', description: 'Latitude' })
    @IsLatitude({ message: 'Latitude inválida' })
    @IsNotEmpty({ message: 'Latitude não pode ser vazia' })
    lat: string;

    @ApiProperty({ example: '-46.633308', description: 'Longitude' })
    @IsLongitude({ message: 'Longitude inválida' })
    @IsNotEmpty({ message: 'Longitude não pode ser vazia' })
    lng: string;
}

export class CreateRouteDto {
    @IsString({ message: 'ID do motorista deve ser uma string' })
    @IsUUID('4', { message: 'ID do motorista deve ser um UUID válido' })
    @IsNotEmpty({ message: 'ID do motorista não pode ser vazio' })
    @ApiProperty({
        description: 'ID do motorista',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    idMotorista: string;

    @ValidateNested({ each: true })
    @Type(() => LocationDto)
    @ApiProperty({
        description: 'Localização de origem',
        type: LocationDto,
    })
    origem: LocationDto;

    @IsArray({ message: 'Destinos deve ser um array' })
    @ValidateNested({ each: true })
    @Type(() => LocationDto)
    @ApiProperty({
        description: 'Lista de destinos',
        type: [LocationDto],
        example: [
            { lat: '-22.909938', lng: '-47.062633' },
            { lat: '-22.906847', lng: '-43.172896' }
        ],
    })
    destinos: LocationDto[];
}
