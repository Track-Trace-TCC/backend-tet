import { Injectable } from '@nestjs/common';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Errors } from 'src/general/errors/errors.enum';
import { ResponseService } from 'src/general/response/response.service';
import * as bcrypt from 'bcrypt';
import { GetAdminUserDto } from './dto/get-admin-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AdminUsersService {
  constructor(
    private prismaService: PrismaService,
    private responseService: ResponseService
  ) { }
  async create(createAdminUserDto: CreateAdminUserDto) {
    const isExists = await this.prismaService.usuarioAdministrador.findMany(
      {
        where: {
          email: createAdminUserDto.email
        }
      }
    );

    if (isExists.length > 0) {
      this.responseService.throwHttpException(Errors.CONFLICT, 'Email já cadastrado')
    }

    createAdminUserDto.password = await bcrypt.hash(createAdminUserDto.password, 10);

    return this.prismaService.usuarioAdministrador.create({
      data: {
        email: createAdminUserDto.email,
        nome: createAdminUserDto.name,
        senha: createAdminUserDto.password
      },
      select: {
        id_Admin: true,
        email: true,
        nome: true
      }
    })
  }

  async findAll(): Promise<GetAdminUserDto[]> {
    const adminUsers = await this.prismaService.usuarioAdministrador.findMany({
      select: {
        id_Admin: true,
        email: true,
        nome: true
      }
    });

    return adminUsers.map(user => plainToInstance(GetAdminUserDto, {
      id: user.id_Admin,
      email: user.email,
      name: user.nome
    }));
  }

  async findOne(id: string): Promise<GetAdminUserDto> {
    const adminUser = await this.prismaService.usuarioAdministrador.findUnique({
      where: {
        id_Admin: id
      },
      select: {
        id_Admin: true,
        email: true,
        nome: true
      }
    });

    if (!adminUser) {
      this.responseService.throwHttpException(Errors.NOT_FOUND, 'Usuário não encontrado');
    }

    return plainToInstance(GetAdminUserDto, {
      id: adminUser.id_Admin,
      email: adminUser.email,
      name: adminUser.nome
    });
  }

  async update(id: string, updateAdminUserDto: UpdateAdminUserDto) {
    const adminUser = await this.prismaService.usuarioAdministrador.findUnique({
      where: {
        id_Admin: id
      }
    });

    if (!adminUser) {
      this.responseService.throwHttpException(Errors.NOT_FOUND, 'Usuário não encontrado');
    }

    if (updateAdminUserDto.email != null) {
      const isExists = await this.prismaService.usuarioAdministrador.findMany(
        {
          where: {
            email: updateAdminUserDto.email
          }
        }
      );

      if (isExists.length > 0) {
        this.responseService.throwHttpException(Errors.CONFLICT, 'Email já cadastrado')
      }
    }

    if (updateAdminUserDto.password != null) {
      updateAdminUserDto.password = await bcrypt.hash(updateAdminUserDto.password, 10);

      if (!await bcrypt.compare(updateAdminUserDto.oldPassword, adminUser.senha)) {
        this.responseService.throwHttpException(Errors.UNAUTHORIZED, 'Senha antiga inválida');
      }
    }

    updateAdminUserDto.email = updateAdminUserDto.email || adminUser.email;
    updateAdminUserDto.name = updateAdminUserDto.name || adminUser.nome;
    updateAdminUserDto.password = updateAdminUserDto.password || adminUser.senha;

    return this.prismaService.usuarioAdministrador.update({
      where: {
        id_Admin: id
      },
      data: {
        email: updateAdminUserDto.email,
        nome: updateAdminUserDto.name,
        senha: updateAdminUserDto.password
      },
      select: {
        id_Admin: true,
        email: true,
        nome: true
      }
    });
  }

  async remove(id: string) {
    const adminUser = await this.prismaService.usuarioAdministrador.findUnique({
      where: {
        id_Admin: id
      }
    });

    if (!adminUser) {
      this.responseService.throwHttpException(Errors.NOT_FOUND, 'Usuário não encontrado');
    }

    return this.prismaService.usuarioAdministrador.delete({
      where: {
        id_Admin: id
      }
    });
  }
}
