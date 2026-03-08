import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Message, Public, Roles } from 'src/common/decorator';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthRoleGuard } from 'src/common/guard/role.guard';
import { RoleEnum } from 'src/common/enum';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Message('Usuario creado con exito')
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @Post()
  @Roles(RoleEnum.ADMIN)
  create(@Body() dto: CreateUserDto) {
    const user = this.service.create(dto);
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('Usuarios encontrado con exito')
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios.' })
  @Get()
  @Public()
  //@Roles(RoleEnum.GESTOR, RoleEnum.ADMIN, RoleEnum.CODER)
  findAll() {
    const user = this.service.findAll();
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('Usuario encontrado con exito')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Detalles del usuario.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.GESTOR)
  findOne(@Param('id') id: string) {
    const user = this.service.findOne(id);
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('Usuario actualizado con exito')
  @Patch(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.CODER, RoleEnum.GESTOR)
  @UseGuards(AuthRoleGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = this.service.update(id, updateUserDto);
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('Usuario eliminado con exito')
  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthRoleGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
