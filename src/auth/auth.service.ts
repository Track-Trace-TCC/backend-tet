import { Injectable } from '@nestjs/common';
import { Errors } from 'src/general/errors/errors.enum';
import { ResponseService } from 'src/general/response/response.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private responseService: ResponseService,
        private jwtService: JwtService
    ) { }

    async validateAdminUser(authDto: AuthDTO): Promise<{ access_token: string, name: string }> {
        const user = await this.prismaService.usuarioAdministrador.findFirst({
            where: {
                email: authDto.email,
            },
        });

        if (!user) {
            this.responseService.throwHttpException(Errors.UNAUTHORIZED, 'Usuário não encontrado');
        }

        const passwordEncrypted = await bcrypt.compare(authDto.password, user.senha);
        if (!passwordEncrypted) {
            this.responseService.throwHttpException(Errors.UNAUTHORIZED, 'Senha incorreta');
        }

        const payload = { email: user.email, name: user.nome, sub: user.id_Admin, role: 'admin' };
        const access_token = this.jwtService.sign(payload);

        return { access_token: access_token, name: user.nome };
    }

    async validateDriverUser(authDto: AuthDTO): Promise<{ access_token: string }> {
        const user = await this.prismaService.motorista.findFirst({
            where: {
                email: authDto.email,
            },
        });

        if (!user) {
            this.responseService.throwHttpException(Errors.UNAUTHORIZED, 'Motorista não encontrado');
        }

        const passwordEncrypted = await bcrypt.compare(authDto.password, user.senha);
        if (!passwordEncrypted) {
            this.responseService.throwHttpException(Errors.UNAUTHORIZED, 'Senha incorreta');
        }

        const payload = { email: user.email, sub: user.id_Motorista, role: 'driver' };
        const access_token = this.jwtService.sign(payload);

        return { access_token };
    }
}