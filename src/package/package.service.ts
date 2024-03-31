import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { generateTrackingCode } from 'src/general/utils/utils';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ResponseService } from 'src/general/response/response.service';
import { TrackingStatus } from 'src/general/tracking-status/tracking-status.enum';
import { GetPackageDto } from './dto/get-package.dto';
import { plainToInstance } from 'class-transformer';
import { Errors } from 'src/general/errors/errors.enum';

@Injectable()
export class PackageService {
  constructor(
    private prismaService: PrismaService,
    private responseService: ResponseService
  ) { }
  async create(createPackageDto: CreatePackageDto) {
    const trackingCode = generateTrackingCode();
    return this.prismaService.entrega.create({
      data: {
        status: TrackingStatus.WAITING_FOR_PICKUP,
        destino: createPackageDto.destino,
        codigoRastreio: trackingCode,
        Cliente: {
          connect: {
            id_Cliente: createPackageDto.idCliente
          }
        },
      }
    });
  }

  async findAll(): Promise<GetPackageDto[]> {
    const packages = await this.prismaService.entrega.findMany({
      include: {
        Cliente: true,
        Motorista: true
      }
    });

    return packages.map(pkg => plainToInstance(GetPackageDto, {
      id: pkg.id_Entrega,
      origem: pkg.origem,
      destino: pkg.destino,
      status: pkg.status,
      codigo_Rastreio: pkg.codigoRastreio,
      data_Criacao: pkg.dataHoraCriacao,
      data_Atualizacao: pkg.dataHoraAtualizacao,
      cliente: {
        id: pkg.Cliente.id_Cliente,
        nome: pkg.Cliente.nome,
        cpf: pkg.Cliente.cpf,
        email: pkg.Cliente.email,
      },
      motorista: pkg.Motorista ? {
        id: pkg.Motorista.id_Motorista,
        nome: pkg.Motorista.nome,
        cnh: pkg.Motorista.cnh,
        email: pkg.Motorista.email,
      } : null,
      data_Entrega: pkg.dataHoraEntrega ? pkg.dataHoraEntrega : null,
    }));
  }

  async findOne(id: string): Promise<GetPackageDto> {
    const pkg = await this.prismaService.entrega.findUnique({
      include: {
        Cliente: true,
        Motorista: true
      },
      where: {
        id_Entrega: id
      }
    });

    if (!pkg) {
      this.responseService.throwHttpException(Errors.NOT_FOUND, 'Pacote não encontrado');
    }

    return plainToInstance(GetPackageDto, {
      id: pkg.id_Entrega,
      origem: pkg.origem,
      destino: pkg.destino,
      status: pkg.status,
      codigo_Rastreio: pkg.codigoRastreio,
      data_Criacao: pkg.dataHoraCriacao,
      data_Atualizacao: pkg.dataHoraAtualizacao,
      cliente: {
        id: pkg.Cliente.id_Cliente,
        nome: pkg.Cliente.nome,
        cpf: pkg.Cliente.cpf,
        email: pkg.Cliente.email,
      },
      motorista: pkg.Motorista ? {
        id: pkg.Motorista.id_Motorista,
        nome: pkg.Motorista.nome,
        cnh: pkg.Motorista.cnh,
        email: pkg.Motorista.email,
      } : null,
      data_Entrega: pkg.dataHoraEntrega ? pkg.dataHoraEntrega : null,
    });
  }

  async remove(id: string) {
    const pkg = await this.prismaService.entrega.findUnique({
      where: {
        id_Entrega: id
      }
    });

    if (!pkg) {
      this.responseService.throwHttpException(Errors.NOT_FOUND, 'Pacote não encontrado');
    }

    return this.prismaService.entrega.delete({
      where: {
        id_Entrega: id
      }
    });
  }
}
