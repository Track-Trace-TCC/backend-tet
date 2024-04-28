import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ResponseService } from 'src/general/response/response.service';
import { Errors } from 'src/general/errors/errors.enum';
import { GetDriverDTO } from './dto/get-driver.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
@Injectable()
export class DriversService {
  constructor(
    private prismaService: PrismaService,
    private responseService: ResponseService
  ) { }

  async create(createDriverDto: CreateDriverDto) {
    const driver = await this.prismaService.motorista.findFirst({
      where: {
        OR: [
          { email: createDriverDto.email },
          { cnh: createDriverDto.cnh }
        ],
      },
    });

    if (driver) {
      if (driver.email === createDriverDto.email) {
        this.responseService.throwHttpException(Errors.CONFLICT, 'Email já cadastrado');
      } else {
        this.responseService.throwHttpException(Errors.CONFLICT, 'CNH já cadastrado');
      }
    }

    createDriverDto.password = await bcrypt.hash(createDriverDto.password, 10);
    return this.prismaService.motorista.create({
      data: {
        nome: createDriverDto.nome,
        email: createDriverDto.email,
        senha: createDriverDto.password,
        cnh: createDriverDto.cnh,
        telefone: createDriverDto.telefone,
        localizacaoAtual: {}
      },
    });
  }

  async findAll(search?: string): Promise<GetDriverDTO[]> {
    let whereCondition: Prisma.MotoristaWhereInput = {};
    if (search) {
      whereCondition = {
        OR: [
          { id_Motorista: { equals: search } },
          { nome: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { cnh: { contains: search, mode: 'insensitive' } },
          { telefone: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const drivers = await this.prismaService.motorista.findMany({
      where: whereCondition,
    });


    return drivers.map(driver => plainToInstance(GetDriverDTO, {
      id: driver.id_Motorista,
      nome: driver.nome,
      email: driver.email,
      cnh: driver.cnh,
      telefone: driver.telefone,
      localizacaoAtual: driver.localizacaoAtual,
    }))
  }

  async findOne(id: string): Promise<GetDriverDTO> {
    const driver = await this.prismaService.motorista.findUnique({
      where: {
        id_Motorista: id
      }
    });

    if (!driver) {
      this.responseService.throwHttpException(Errors.NOT_FOUND, 'Motorista não encontrado');
    }

    return plainToInstance(GetDriverDTO, {
      id: driver.id_Motorista,
      nome: driver.nome,
      email: driver.email,
      cnh: driver.cnh,
      telefone: driver.telefone,
      localizacaoAtual: driver.localizacaoAtual,
    });
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    const driver = await this.prismaService.motorista.findUnique({
      where: {
        id_Motorista: id
      }
    });

    if (!driver) {
      this.responseService.throwHttpException(Errors.NOT_FOUND, 'Motorista não encontrado');
    }

    if (updateDriverDto.email && updateDriverDto.email !== driver.email) {
      const driver = this.prismaService.motorista.findFirst({
        where: {
          email: updateDriverDto.email
        }
      });

      if (driver) {
        this.responseService.throwHttpException(Errors.CONFLICT, 'Email já cadastrado');
      }
    }

    updateDriverDto = {
      email: updateDriverDto.email || driver.email,
      nome: updateDriverDto.nome || driver.nome,
      telefone: updateDriverDto.telefone || driver.telefone,
      cnh: driver.cnh,
    }

    return this.prismaService.motorista.update({
      where: {
        id_Motorista: id
      },
      data: {
        ...updateDriverDto
      }
    });
  }

  async updateDriverLocation(id: string, lat: number, lng: number) {
    const driver = await this.prismaService.motorista.findUnique({
      where: {
        id_Motorista: id
      }
    });

    if (!driver) {
      this.responseService.throwHttpException(Errors.NOT_FOUND, 'Motorista não encontrado');
    }

    return this.prismaService.motorista.update({
      where: {
        id_Motorista: id
      },
      data: {
        localizacaoAtual: {
          lat,
          lng,
        },
      }
    });
  }
  remove(id: string) {
    const driver = this.prismaService.motorista.findUnique({
      where: {
        id_Motorista: id
      }
    });

    if (!driver) {
      this.responseService.throwHttpException(Errors.NOT_FOUND, 'Motorista não encontrado');
    }

    return this.prismaService.motorista.delete({
      where: {
        id_Motorista: id
      }
    });
  }
}
