import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { IsCnh } from "src/general/utils/utils";

export class CreateDriverDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Nome do motorista',
        example: 'João da Silva'
    })
    nome: string;

    @IsString()
    @IsNotEmpty()
    @IsCnh({
        message: 'O CNH fornecido é inválido.'
    })
    @ApiProperty({
        description: 'CNH do motorista',
        example: '12345678900'
    })
    cnh: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Email do motorista',
        example: 'teste@track.com'
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Senha do motorista',
        example: '123456'
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('BR')
    @ApiProperty({
        description: 'Telefone do motorista',
        example: '+55 (11) 99999-9999'
    })
    telefone: string;

}
