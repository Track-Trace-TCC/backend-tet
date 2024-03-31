import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { IsCpf } from "src/general/utils/utils";

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Nome do cliente',
        example: 'João da Silva'
    })
    nome: string;

    @IsString()
    @IsNotEmpty()
    @IsCpf({ message: 'O CPF fornecido é inválido.' })
    @ApiProperty({
        description: 'CPF do cliente',
        example: '12345678900'
    })
    cpf: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description: 'Email do cliente',
        example: 'teste@track.com'
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('BR')
    @ApiProperty({
        description: 'Telefone do cliente',
        example: '+55 (11) 99999-9999'
    })
    telefone: string;
}
