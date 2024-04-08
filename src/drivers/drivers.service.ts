import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ResponseService } from 'src/general/response/response.service';
import { Errors } from 'src/general/errors/errors.enum';
import { GetDriverDTO } from './dto/get-driver.dto';
import { plainToInstance } from 'class-transformer';

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

    return this.prismaService.motorista.create({
      data: {
        nome: createDriverDto.nome,
        email: createDriverDto.email,
        cnh: createDriverDto.cnh,
        telefone: createDriverDto.telefone,
        localizacaoAtual: {}
      },
    });
  }

  async findAll(): Promise<GetDriverDTO[]> {
    const drivers = await this.prismaService.motorista.findMany();


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

    if (updateDriverDto.email) {
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
