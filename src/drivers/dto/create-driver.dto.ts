import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { IsCnh } from "src/general/utils/utils";

export class CreateDriverDto {
    @IsString({ message: 'O campo "nome" deve ser uma string.' })
    @IsNotEmpty({ message: 'O campo "nome" não pode estar vazio.' })
    @ApiProperty({
        description: 'Nome do motorista',
        example: 'João da Silva'
    })
    nome: string;

    @IsString({ message: 'O campo "cnh" deve ser uma string.' })
    @IsNotEmpty({ message: 'O campo "cnh" não pode estar vazio.' })
    @IsCnh({
        message: 'O CNH fornecido é inválido.'
    })
    @ApiProperty({
        description: 'CNH do motorista',
        example: '12345678900'
    })
    cnh: string;

    @IsString({ message: 'O campo "email" deve ser uma string.' })
    @IsEmail({}, { message: 'O campo "email" deve ser um e-mail válido' })
    @IsNotEmpty({ message: 'O campo "email" não pode estar vazio.' })
    @ApiProperty({
        description: 'Email do motorista',
        example: 'teste@track.com'
    })
    email: string;

    @IsString({ message: 'O campo "password" deve ser uma string.' })
    @IsNotEmpty({ message: 'O campo "password" não pode estar vazio.' })
    @ApiProperty({
        description: 'Senha do motorista',
        example: '123456'
    })
    password: string;

    @IsString({ message: 'O campo "telefone" deve ser uma string.' })
    @IsNotEmpty({ message: 'O campo "telefone" não pode estar vazio.' })
    @IsPhoneNumber('BR', { message: 'O telefone fornecido é inválido.' })
    @ApiProperty({
        description: 'Telefone do motorista',
        example: '+55 (11) 99999-9999'
    })
    telefone: string;

}
