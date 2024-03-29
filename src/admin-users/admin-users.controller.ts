import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuários Administradores')
@Controller('admin-users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) { }

  @Post()
  async create(@Body() createAdminUserDto: CreateAdminUserDto) {
    try {
      const response = await this.adminUsersService.create(createAdminUserDto);
      return response;
    } catch (error) {
      throw error
    }

  }

  @Get()
  findAll() {
    return this.adminUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminUserDto: UpdateAdminUserDto) {
    return this.adminUsersService.update(+id, updateAdminUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminUsersService.remove(+id);
  }
}
