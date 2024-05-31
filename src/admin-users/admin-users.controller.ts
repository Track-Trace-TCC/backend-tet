import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, ParseUUIDPipe, HttpCode, Res, UseGuards, Query } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GetAdminUserDto, GetByIDDTO } from './dto/get-admin-user.dto';
import { ErrorResponse, Errors } from 'src/general/errors/errors.enum';
import { ResponseService } from 'src/general/response/response.service';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Usuários Administradores')
@Controller('admin-users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService,
    private responseService: ResponseService) { }
  @ApiResponse(
    {
      status: HttpStatus.CREATED,
      description: 'Cria um novo usuário administrador',
      type: GetAdminUserDto
    },
  )
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponse,
    description: 'Erro na requisição',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    type: ErrorResponse,
    description: 'Email já cadastrado',
  })
  @Post()
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('admin')
  // @ApiBearerAuth('access-token')
  async create(@Body() createAdminUserDto: CreateAdminUserDto) {
    try {
      const response = await this.adminUsersService.create(createAdminUserDto);
      return response;
    } catch (error) {
      throw error
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna todos os usuários administradores cadastrados',
    type: GetAdminUserDto,
    isArray: true
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
    description: 'Erro interno do servidor',
  })
  findAll(@Query('search') search?: string): Promise<GetAdminUserDto[]> {
    try {
      return this.adminUsersService.findAll(search);
    } catch (error) {
      this.responseService.throwHttpException(Errors.INTERNAL_ERROR, error.message);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna um usuário administrador específico',
    type: GetAdminUserDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponse,
    description: 'Usuário administrador não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
    description: 'Erro interno do servidor',
  })
  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.adminUsersService.findOne(id);
    } catch (error) {
      throw error
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Atualiza um usuário administrador',
    type: GetAdminUserDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponse,
    description: 'Usuário administrador não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: ErrorResponse,
    description: 'Senha antiga invalida',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    type: ErrorResponse,
    description: 'Email já cadastrado!',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
    description: 'Erro interno do servidor',
  })
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAdminUserDto: UpdateAdminUserDto) {
    return this.adminUsersService.update(id, updateAdminUserDto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Remove um usuário administrador',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponse,
    description: 'Usuário administrador não encontrado',
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
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.adminUsersService.remove(id);
    } catch (error) {
      throw error
    }
  }
}
