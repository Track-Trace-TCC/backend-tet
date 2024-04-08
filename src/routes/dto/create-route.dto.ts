import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsLatitude, IsLongitude, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";

class LocationDto {
    @ApiProperty({ example: '-23.550520', description: 'Latitude' })
    @IsLatitude()
    @IsNotEmpty()
    lat: string;

    @ApiProperty({ example: '-46.633308', description: 'Longitude' })
    @IsLongitude()
    @IsNotEmpty()
    lng: string;
}

export class CreateRouteDto {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID do motorista',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    idMotorista: string;

    @ValidateNested()
    @Type(() => LocationDto)
    @ApiProperty({
        description: 'Localização de origem',
        type: LocationDto,
    })
    origem: LocationDto;

    @IsArray()
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
