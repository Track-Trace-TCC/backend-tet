import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPackageDto } from './dto/get-package.dto';
import { ErrorResponse } from 'src/general/errors/errors.enum';
import { AssociatePackageToDriver } from './dto/associate-package-to-driver.dto';

@ApiTags('Pacotes')
@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Cria um novo pacote',
    type: GetPackageDto
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
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.create(createPackageDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna todos os pacotes cadastrados',
    type: GetPackageDto,
    isArray: true
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
    description: 'Erro interno do servidor',
  })
  @Get()
  findAll() {
    return this.packageService.findAll();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna um pacote específico',
    type: GetPackageDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponse,
    description: 'Pacote não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
    description: 'Erro interno do servidor',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packageService.findOne(id);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Atualiza um pacote específico',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponse,
    description: 'Pacote não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
    description: 'Erro interno do servidor',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.packageService.remove(id);
  }

  @Patch('associate-driver')
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: GetPackageDto,
    description: 'Associa pacotes a um motorista com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponse,
    description: 'Motorista ou pacote não encontrado',
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
  async associateDriver(@Body() input: AssociatePackageToDriver) {
    return this.packageService.associateDriver(input);
  }
}
