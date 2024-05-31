import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { generateTrackingCode } from 'src/general/utils/utils';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ResponseService } from 'src/general/response/response.service';
import { TrackingStatus } from 'src/general/tracking-status/tracking-status.enum';
import { GetPackageDto } from './dto/get-package.dto';
import { plainToInstance } from 'class-transformer';
import { Errors } from 'src/general/errors/errors.enum';
import { AssociatePackageToDriver } from './dto/associate-package-to-driver.dto';
import { Prisma } from '@prisma/client';



@Injectable()
export class PackageService {
  constructor(
    private prismaService: PrismaService,
    private responseService: ResponseService
  ) { }

  async create(createPackageDto: CreatePackageDto) {
    const customer = await this.prismaService.cliente.findUnique({
      where: {
        id_Cliente: createPackageDto.idCliente
      }
    });

    if (!customer) {
      this.responseService.throwHttpException(Errors.NOT_FOUND, 'Cliente dono do pacote não cadastrado');
    }

    const trackingCode = generateTrackingCode();

    return this.prismaService.entrega.create({
      data: {
        status: TrackingStatus.WAITING_FOR_PICKUP,
        destino: JSON.stringify(createPackageDto.destino),
        codigoRastreio: trackingCode,
        Cliente: {
          connect: {
            id_Cliente: createPackageDto.idCliente
          }
        },
      }
    });
  }

  async getByTrackCodeAndCpf(trackCode: string, cpf: string) {
    const currentPackage = await this.prismaService.entrega.findFirst({
      where: {
        Cliente: {
          cpf
        },
        codigoRastreio: trackCode,
      },
      include: {
        Motorista: true
      }
    });
    if (!currentPackage) {
      this.responseService.throwHttpException(Errors.NOT_FOUND, 'Pacote não encontrado');
    }

    return currentPackage;
  }

  async findAll(search?: string): Promise<GetPackageDto[]> {
    let whereCondition: Prisma.EntregaWhereInput = {};
    if (search) {
      whereCondition = {
        OR: [
          { id_Entrega: { equals: search } },
          { codigoRastreio: { contains: search, mode: 'insensitive' } },
          {
            Cliente: {
              nome: {
                contains: search,
                mode: 'insensitive'
              }
            }
          },
        ],
      };
    }

    const packages = await this.prismaService.entrega.findMany({
      where: whereCondition,
      include: {
        Cliente: true,
        Motorista: true
      }
    });

    return packages.map(pkg => plainToInstance(GetPackageDto, {
      id: pkg.id_Entrega,
      origem: typeof pkg.origem === 'string' ? JSON.parse(pkg.origem) : pkg.origem,
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

  async associateDriver(input: AssociatePackageToDriver) {
    const driver = await this.prismaService.motorista.findUnique({
      where: {
        id_Motorista: input.idMotorista
      }
    });

    if (!driver) {
      this.responseService.throwHttpException(Errors.NOT_FOUND, 'Motorista não encontrado');
    }

    const packages = [];
    for (const id of input.packages_ids) {
      const pkg = await this.prismaService.entrega.findUnique({
        where: {
          id_Entrega: id
        }
      });

      if (!pkg) {
        return this.responseService.throwHttpException(Errors.NOT_FOUND, `Pacote com id ${pkg.id_Entrega} não encontrado`);
      }
      const updatedPkg = await this.prismaService.entrega.update({
        where: {
          id_Entrega: id
        },
        data: {
          origem: JSON.stringify(input.localizacao),
          status: TrackingStatus.EN_ROUTE,
          Rota: {
            connect: {
              id_Rota: input.route_id
            }
          },
          Motorista: {
            connect: {
              id_Motorista: input.idMotorista
            }
          }
        }
      });

      packages.push(updatedPkg);
    }

    return packages;
  }

  async finishDelivery(id: string) {
    const pkg = await this.prismaService.entrega.findUnique({
      where: {
        id_Entrega: id
      }
    });

    if (!pkg) {
      this.responseService.throwHttpException(Errors.NOT_FOUND, 'Pacote não encontrado');
    }

    return this.prismaService.entrega.update({
      where: {
        id_Entrega: id
      },
      data: {
        status: TrackingStatus.DELIVERED,
        dataHoraEntrega: new Date()
      }
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

  async getInTransitByDriverId(driverId: string, route_id: string) {
    const driver = await this.prismaService.motorista.findUnique({
      where: {
        id_Motorista: driverId
      }
    });

    if (!driver) {
      this.responseService.throwHttpException(Errors.NOT_FOUND, 'Motorista não encontrado');
    }

    const packages = await this.prismaService.entrega.findMany({
      include: {
        Cliente: true,
        Motorista: true
      },
      where: {
        Motorista: {
          id_Motorista: driverId
        },
        Rota: {
          id_Rota: route_id
        },
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
      motorista: {
        id: driver.id_Motorista,
        nome: driver.nome,
        cnh: driver.cnh,
        email: driver.email,
      },
      cliente: {
        id: pkg.Cliente.id_Cliente,
        nome: pkg.Cliente.nome,
        cpf: pkg.Cliente.cpf,
        email: pkg.Cliente.email,
      },
      data_Entrega: pkg.dataHoraEntrega ? pkg.dataHoraEntrega : null,
    }));
  }
}
