import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAdminUserDto {
    @IsNotEmpty({ message: 'O campo "name" é obrigatório' })
    @ApiProperty({
        description: 'Nome do usuário',
        example: 'João da Silva',
        required: true
    })
    name: string;
    @IsEmail({}, { message: 'O campo "email" deve ser um e-mail válido' })
    @IsString({ message: 'O campo "email" deve ser uma string' })
    @IsNotEmpty({ message: 'O campo "email" é obrigatório' })
    @ApiProperty({
        description: 'E-mail do usuário',
        example: 'teste@track.com',
    })
    email: string;
    @IsString({ message: 'O campo "password" deve ser uma string' })
    @IsNotEmpty({ message: 'O campo "password" é obrigatório' })
    @ApiProperty({
        description: 'Senha do usuário',
        example: '123456',
        required: true
    })
    password: string;
}
