/**
 *  
import { Controller, Get, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Message, Public, Roles } from 'src/common/decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RoleEnum } from 'src/common/enum';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Message('Rol creado con exito')
  @ApiOperation({ summary: 'Crear un nuevo rol' })
  @ApiResponse({ status: 201, description: 'Rol creado exitosamente.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @Public()
  @Roles(RoleEnum.ADMIN)
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.service.create(dto);
  }

  @Message('Rol encontrado exitosamente')
  @ApiOperation({ summary: 'Obtener todos los roles' })
  @ApiResponse({ status: 200, description: 'Lista de roles.' })
  @Public()
  @Roles(RoleEnum.ADMIN)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Message('Rol encontrado exitosamente')
  @ApiOperation({ summary: 'Obtener un rol por nombre' })
  @ApiResponse({ status: 200, description: 'Detalles del rol.' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  @Roles(RoleEnum.ADMIN)
  @Get('name')
  findOne(@Body() name: string) {
    return this.service.findByName(name);
  }
}

*/
