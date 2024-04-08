import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetRouteDto } from './dto/get-route.dto';
import { ErrorResponse } from 'src/general/errors/errors.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Rotas')
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Cria uma nova rota',
    type: GetRouteDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro na requisição',
    type: ErrorResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
    type: ErrorResponse
  })
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('driver')
  @ApiBearerAuth('access-token')
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna uma rota específica',
    type: GetRouteDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Rota não encontrada',
    type: ErrorResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
    type: ErrorResponse
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('driver')
  @ApiBearerAuth('access-token')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routesService.findOne(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Atualiza uma rota',
    type: GetRouteDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Rota não encontrada',
    type: ErrorResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
    type: ErrorResponse
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('driver')
  @ApiBearerAuth('access-token')
  finish(@Param('id') id: string) {
    return this.routesService.finishRoute(id);
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna a rota ativa de um motorista',
    type: GetRouteDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Rota não encontrada',
    type: ErrorResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
    type: ErrorResponse
  })
  @Get('active/:driverId')
  getActiveRouteByDriverId(@Param('driverId') driverId: string) {
    return this.routesService.getActiveRouteByDriverId(driverId);
  }
}
