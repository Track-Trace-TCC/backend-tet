import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class AuthDTO {
    @IsString()
    @IsEmail()
    @ApiProperty({
        description: 'Email do usuário',
        example: 'teste@track.com'
    })
    email: string;

    @IsString()
    @ApiProperty({
        description: 'Senha do usuário',
        example: '123456'
    })
    password: string;
}