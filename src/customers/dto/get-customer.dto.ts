import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class GetCustomerDTO {
    @IsUUID()
    @ApiProperty({
        description: 'ID do cliente',
        example: '07e1a857-485f-426b-88e1-492319f416a3'
    })
    id: string;

    @IsString()
    @ApiProperty({
        description: 'Nome do cliente',
        example: 'João da Silva'
    })
    nome: string;

    @IsString()
    @ApiProperty({
        description: 'Email do cliente',
        example: 'teste@track.com'
    })
    email: string;

    @IsString()
    @ApiProperty({
        description: 'Telefone do cliente',
        example: '+55 (11) 99999-9999'
    })
    telefone: string;
}