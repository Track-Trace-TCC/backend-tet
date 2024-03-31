import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponse } from 'src/general/errors/errors.enum';
import { GetCustomerDTO } from './dto/get-customer.dto';

@ApiTags('Clientes')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }


  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Cria um novo cliente',
    type: CreateCustomerDto
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    type: ErrorResponse,
    description: 'Email já cadastrado',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    type: ErrorResponse,
    description: 'Documento já cadastrado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponse,
    description: 'Erro na requisição',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
    type: ErrorResponse,
  })
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna todos os clientes cadastrados',
    type: GetCustomerDTO,
    isArray: true
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
    description: 'Erro interno do servidor',
  })
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna um cliente específico',
    type: GetCustomerDTO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponse,
    description: 'Cliente não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
    description: 'Erro interno do servidor',
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.customersService.findOne(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Atualiza um cliente específico',
    type: GetCustomerDTO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponse,
    description: 'Cliente não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    type: ErrorResponse,
    description: 'Email já cadastrado',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    type: ErrorResponse,
    description: 'Documento já cadastrado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponse,
    description: 'Erro na requisição',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
    description: 'Erro interno do servidor',
  })
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Remove um cliente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponse,
    description: 'Cliente não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
    description: 'Erro interno do servidor',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
