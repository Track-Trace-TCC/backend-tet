import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class GetAdminUserDto {
    @ApiProperty({
        description: 'Senha do usuário',
        example: '725183b0-e97f-4786-91cf-eca93fb5b875',
    })
    id: string;

    @ApiProperty({
        description: 'Nome do usuário',
        example: 'João da Silva',
    })
    name: string;

    @ApiProperty({
        description: 'E-mail do usuário',
        example: 'teste@track.com',
    })
    email: string;
}

export class GetByIDDTO {
    @ApiProperty({
        description: 'ID do usuário',
        example: '725183b0-e97f-4786-91cf-eca93fb5b875',
    })
    @IsUUID()
    @IsNotEmpty()
    id: string;
}