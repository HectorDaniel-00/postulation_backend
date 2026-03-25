import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Message, Roles, Public } from 'src/common/decorator';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiSecurity,
} from '@nestjs/swagger';
import { RoleEnum } from 'src/common/enum';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@ApiSecurity('x-api-key')
@Controller('user')
export class UserController {
  // Inyección del servicio de usuarios para gestionar la persistencia y lógica de perfiles
  constructor(private readonly service: UserService) {}

  @Message('User successfully created')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 403, description: 'Access denied.' })
  @Post()
  @Roles(RoleEnum.ADMIN) // Solo el administrador puede crear usuarios directamente por este endpoint
  create(@Body() dto: CreateUserDto) {
    // Crea el usuario y transforma la respuesta para ocultar datos sensibles (como la contraseña)
    const user = this.service.create(dto);
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('Users successfully found')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users.' })
  @Get()
  @Public()
  findAll() {
    // Obtiene todos los usuarios y los transforma a DTO de respuesta
    const user = this.service.findAll();
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('User successfully found')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User details.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.GESTOR)
  findOne(@Param('id') id: string) {
    // Busca un usuario específico por su ID único
    const user = this.service.findOne(id);
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('User successfully updated')
  @Patch(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.CODER, RoleEnum.GESTOR)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // Actualiza los datos del usuario especificado
    const user = this.service.update(id, updateUserDto);
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('Delete user')
  @Delete(':id')
  @Roles(RoleEnum.ADMIN) // Operación restringida a administradores
  remove(@Param('id') id: string) {
    // Elimina (o marca como eliminado) al usuario
    return this.service.remove(id);
  }
}
