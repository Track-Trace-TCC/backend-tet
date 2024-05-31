import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, ParseUUIDPipe, UseGuards, Query } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPackageDto } from './dto/get-package.dto';
import { ErrorResponse } from 'src/general/errors/errors.enum';
import { AssociatePackageToDriver } from './dto/associate-package-to-driver.dto';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  findAll(@Query('search') search: string) {
    return this.packageService.findAll(search);
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('driver')
  @ApiBearerAuth('access-token')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('driver')
  @ApiBearerAuth('access-token')
  async associateDriver(@Body() input: AssociatePackageToDriver) {
    return this.packageService.associateDriver(input);
  }

  @Patch(':id/finish-delivery')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('driver')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Finaliza a entrega do pacote',
    type: GetPackageDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponse,
    description: 'Pacote não encontrado',
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
  async finishDelivery(@Param('id', ParseUUIDPipe) id: string) {
    return this.packageService.finishDelivery(id);
  }

  @Get('/track-code/:code/cpf/:cpf')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna o status do pacote',
    type: GetPackageDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponse,
    description: 'Pacote não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponse,
    description: 'Erro na requisição',
  })
  async getByTrackCodeAndCpf(@Param('code') code: string, @Param('cpf') cpf: string) {
    return this.packageService.getByTrackCodeAndCpf(code, cpf);
  }

  @Get('/driver/:id/route/:routeId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('driver')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna os pacotes associados ao motorista',
    type: GetPackageDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponse,
    description: 'Motorista não encontrado',
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
  async getInTransitByDriverId(@Param('id', ParseUUIDPipe) driverId: string, @Param('routeId', ParseUUIDPipe) routeId: string) {
    return this.packageService.getInTransitByDriverId(driverId, routeId);
  }
}
