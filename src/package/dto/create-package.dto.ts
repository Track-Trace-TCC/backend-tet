import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePackageDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Destino do pacote',
        example: 'Rua dos bobos, numero 0'
    })
    destino: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Identificador do cliente dono do pacote',
        example: '07e1a857-485f-426b-88e1-492319f416a3'
    })
    idCliente: string;

}
