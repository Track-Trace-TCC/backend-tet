import { Injectable } from '@nestjs/common';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Errors } from 'src/general/errors/errors.enum';
import { ResponseService } from 'src/general/response/response.service';

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

    return this.prismaService.usuarioAdministrador.create({
      data: {
        email: createAdminUserDto.email,
        nome: createAdminUserDto.name,
        senha: createAdminUserDto.password
      }
    })
  }

  findAll() {
    return `This action returns all adminUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminUser`;
  }

  update(id: number, updateAdminUserDto: UpdateAdminUserDto) {
    return `This action updates a #${id} adminUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminUser`;
  }
}
