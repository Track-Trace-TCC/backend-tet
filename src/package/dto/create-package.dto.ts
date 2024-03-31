import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Localizacao } from "./associate-package-to-driver.dto";

export class CreatePackageDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Destino do pacote',
        example: {
            latitude: '-23.5505199',
            longitude: '-46.6333094'
        }
    })
    destino: Localizacao;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Identificador do cliente dono do pacote',
        example: '07e1a857-485f-426b-88e1-492319f416a3'
    })
    idCliente: string;

}
