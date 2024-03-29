import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminUserDto } from './create-admin-user.dto';
import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UpdateAdminUserDto extends PartialType(CreateAdminUserDto) {
    @IsNotEmpty({ message: 'O campo "name" é obrigatório' })
    @ApiProperty({
        description: 'Nome do usuário',
        example: 'João da Silva',
        required: true
    })
    name: string;

    @IsEmail({}, { message: 'O campo "email" deve ser um e-mail válido' })
    @IsString({ message: 'O campo "email" deve ser uma string' })
    @ApiProperty({
        description: 'E-mail do usuário',
        example: 'teste@track.com',
    })
    email: string;

    @Exclude({ toPlainOnly: true })
    @IsString({ message: 'O campo "password" deve ser uma string' })
    @ValidateIf(o => o.password || o.oldPassword)
    @ApiProperty({
        description: 'senha antiga do usuário',
        example: '123456',
        required: true
    })
    @IsNotEmpty({ message: 'O campo "password" é obrigatório quando "oldPassword" é fornecido' })
    oldPassword: string;

    @Exclude({ toPlainOnly: true })
    @ValidateIf(o => o.oldPassword)
    @IsString({ message: 'O campo "password" deve ser uma string' })
    @IsNotEmpty({ message: 'O campo "password" é obrigatório quando "oldPassword" é fornecido' })
    @ApiProperty({
        description: 'Nova senha do usuário',
        example: '123456',
        required: true
    })
    password: string;
}
