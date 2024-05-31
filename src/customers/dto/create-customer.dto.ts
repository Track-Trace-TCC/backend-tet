import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { IsCpf } from "src/general/utils/utils";

export class CreateCustomerDto {
    @IsString({ message: 'O campo "nome" deve ser uma string.' })
    @IsNotEmpty({ message: 'O campo "nome" não pode estar vazio.' })
    @ApiProperty({
        description: 'Nome do cliente',
        example: 'João da Silva'
    })
    nome: string;

    @IsString({ message: 'O campo "cpf" deve ser uma string.' })
    @IsNotEmpty({ message: 'O campo "cpf" não pode estar vazio.' })
    @IsCpf({ message: 'O CPF fornecido é inválido.' })
    @ApiProperty({
        description: 'CPF do cliente',
        example: '12345678900'
    })
    cpf: string;

    @IsString({ message: 'O campo "email" deve ser uma string.' })
    @IsNotEmpty({ message: 'O campo "email" não pode estar vazio.' })
    @IsEmail({}, { message: 'O campo "email" deve ser um e-mail válido.' })
    @ApiProperty({
        description: 'Email do cliente',
        example: 'teste@track.com'
    })
    email: string;

    @IsString({ message: 'O campo "telefone" deve ser uma string.' })
    @IsNotEmpty({ message: 'O campo "telefone" não pode estar vazio.' })
    @IsPhoneNumber('BR', { message: 'O telefone fornecido é inválido.' })
    @ApiProperty({
        description: 'Telefone do cliente',
        example: '+55 (11) 99999-9999'
    })
    telefone: string;
}
