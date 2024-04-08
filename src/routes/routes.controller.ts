import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetRouteDto } from './dto/get-route.dto';
import { ErrorResponse } from 'src/general/errors/errors.enum';

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
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routesService.findOne(id);
  }

  @Patch('finish/:id')
  finish(@Param('id') id: string) {
    return this.routesService.finishRoute(id);
  }

}
