import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetDriverDTO } from './dto/get-driver.dto';
import { ErrorResponse } from 'src/general/errors/errors.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Motoristas')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Cria um novo motorista',
    type: GetDriverDTO
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    type: ErrorResponse,
    description: 'Email já cadastrado',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    type: ErrorResponse,
    description: 'CNH já cadastrado',
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
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna todos os motoristas cadastrados',
    type: GetDriverDTO,
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
  findAll() {
    return this.driversService.findAll();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna um motorista específico',
    type: GetDriverDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Motorista não encontrado',
    type: ErrorResponse,

  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
    type: ErrorResponse,
  })
  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Atualiza um motorista específico',
    type: GetDriverDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Motorista não encontrado',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email já cadastrado',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponse,
    description: 'Erro na requisição',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
    type: ErrorResponse,
  })
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(id, updateDriverDto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Remove um motorista específico',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Motorista não encontrado',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
    type: ErrorResponse,
  })
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.driversService.remove(id);
  }
}
