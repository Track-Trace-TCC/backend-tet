import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ResponseService } from 'src/general/response/response.service';
import { Errors } from 'src/general/errors/errors.enum';
import e from 'express';
import { GetCustomerDTO } from './dto/get-customer.dto';
import { plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomersService {
  constructor(
    private prismaService: PrismaService,
    private responseService: ResponseService
  ) { }
  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.prismaService.cliente.findFirst({
      where: {
        OR: [
          { email: createCustomerDto.email },
          { cpf: createCustomerDto.cpf }
        ],
      },
    });

    if (customer) {
      if (customer.email === createCustomerDto.email) {
        this.responseService.throwHttpException(Errors.CONFLICT, 'Email já cadastrado');
      } else {
        this.responseService.throwHttpException(Errors.CONFLICT, 'Documento já cadastrado');
      }
    }

    return this.prismaService.cliente.create({
      data: {
        nome: createCustomerDto.nome,
        email: createCustomerDto.email,
        cpf: createCustomerDto.cpf,
        telefone: createCustomerDto.telefone,
      },
    });
  }

  async findAll(search?: string): Promise<GetCustomerDTO[]> {
    let whereCondition: Prisma.ClienteWhereInput = {};
    if (search) {
      whereCondition = {
        OR: [
          { id_Cliente: { equals: search } },
          { nome: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { cpf: { contains: search, mode: 'insensitive' } },
          { telefone: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const customers = await this.prismaService.cliente.findMany({
      where: whereCondition,
    });

    return customers.map(customer => plainToInstance(GetCustomerDTO, {
      id: customer.id_Cliente,
      nome: customer.nome,
      email: customer.email,
      cpf: customer.cpf,
      telefone: customer.telefone
    }))

  }

  async findOne(id: string): Promise<GetCustomerDTO> {
    const customer = await this.prismaService.cliente.findUnique({
      where: {
        id_Cliente: id
      }
    });

    if (!customer) {
      this.responseService.throwHttpException(Errors.NOT_FOUND, 'Cliente não encontrado');
    }

    return plainToInstance(GetCustomerDTO, {
      id: customer.id_Cliente,
      nome: customer.nome,
      email: customer.email,
      cpf: customer.cpf,
      telefone: customer.telefone
    });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.prismaService.cliente.findUnique({
      where: {
        id_Cliente: id
      }
    });

    if (!customer) {
      this.responseService.throwHttpException(Errors.NOT_FOUND, 'Cliente não encontrado');
    }

    if (updateCustomerDto.email && updateCustomerDto.email !== customer.email) {
      const customer = await this.prismaService.cliente.findFirst({
        where: {
          email: updateCustomerDto.email
        }
      });

      if (customer) {
        this.responseService.throwHttpException(Errors.CONFLICT, 'Email já cadastrado');
      }
    }

    if (updateCustomerDto.cpf && updateCustomerDto.cpf !== customer.cpf) {
      const customer = await this.prismaService.cliente.findFirst({
        where: {
          cpf: updateCustomerDto.cpf
        }
      });

      if (customer) {
        this.responseService.throwHttpException(Errors.CONFLICT, 'Documento já cadastrado');
      }
    }

    updateCustomerDto = {
      nome: updateCustomerDto.nome || customer.nome,
      email: updateCustomerDto.email || customer.email,
      cpf: updateCustomerDto.cpf || customer.cpf,
      telefone: updateCustomerDto.telefone || customer.telefone
    }

    return this.prismaService.cliente.update({
      where: {
        id_Cliente: id
      },
      data: updateCustomerDto
    });
  }

  async remove(id: string) {
    const customer = await this.prismaService.cliente.findUnique({
      where: {
        id_Cliente: id
      }
    });

    if (!customer) {
      this.responseService.throwHttpException(Errors.NOT_FOUND, 'Cliente não encontrado');
    }

    return this.prismaService.cliente.delete({
      where: {
        id_Cliente: id
      }
    });

  }
}
