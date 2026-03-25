import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Roles } from '../common/decorator/role.decorator';
import { Public } from '../common/decorator/public.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiSecurity,
} from '@nestjs/swagger';
import { CurrentUser, Message } from 'src/common/decorator';
import { AuthRoleGuard } from 'src/common/guard/role.guard';
import { RoleEnum } from 'src/common/enum';
import { AuthPayloadDto } from 'src/auth/dto';

@ApiTags('Vacancies')
@ApiSecurity('x-api-key')
@ApiBearerAuth('access-token')
@Controller('vacancies')
export class VacancyController {
  // El constructor inyecta el servicio VacancyService para gestionar la lógica de las ofertas de empleo
  constructor(private readonly service: VacancyService) {}

  @Message('Vacante creada con exito')
  @ApiOperation({ summary: 'Crear una nueva vacante' })
  @ApiResponse({ status: 201, description: 'Vacante creada exitosamente.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @ApiBearerAuth('access-token')
  @Post()
  @Roles(RoleEnum.ADMIN, RoleEnum.GESTOR) // Solo administradores o gestores pueden crear vacantes
  @UseGuards(AuthRoleGuard)
  create(@Body() dto: CreateVacancyDto, @CurrentUser() user: AuthPayloadDto) {
    // Crea una nueva vacante en el sistema
    return this.service.create(dto, user.id!);
  }

  @Message('Exito a obtener todas las vacantes')
  @ApiOperation({ summary: 'Obtener todas las vacantes' })
  @ApiResponse({ status: 200, description: 'Lista de vacantes.' })
  @Public() // Endpoint público para que los candidatos vean las ofertas
  @Get()
  findAll() {
    // Obtiene el listado completo de vacantes disponibles
    return this.service.findAll();
  }

  @Message('exito a obtener vacante por id')
  @ApiOperation({ summary: 'Obtener una vacante por ID' })
  @ApiResponse({ status: 200, description: 'Detalles de la vacante.' })
  @ApiResponse({ status: 404, description: 'Vacante no encontrada.' })
  @Public() // Endpoint público
  @Get(':id')
  findOne(@Param('id') id: string) {
    // Busca los detalles de una vacante específica por su ID
    return this.service.findOne(id);
  }

  @Message('Vacante actualizada con exito')
  @ApiOperation({ summary: 'Actualizar una vacante' })
  @ApiResponse({
    status: 200,
    description: 'Vacante actualizada exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Vacante no encontrada.' })
  @ApiBearerAuth('access-token')
  @Patch(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.GESTOR) // Restringido a perfiles con permisos de edición
  @UseGuards(AuthRoleGuard)
  update(@Param('id') id: string, @Body() dto: UpdateVacancyDto) {
    // Actualiza la información de una vacante existente
    return this.service.update(id, dto);
  }

  @Message('Exito a obtener vacantes activa')
  @ApiOperation({ summary: 'Activar o desactivar una vacante' })
  @ApiResponse({
    status: 200,
    description: 'Estado de la vacante actualizado.',
  })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 404, description: 'Vacante no encontrada.' })
  @Get(':id/active')
  @Roles(RoleEnum.ADMIN, RoleEnum.GESTOR, RoleEnum.CODER)
  @UseGuards(AuthRoleGuard)
  toggleActive(@Param('id') id: string) {
    // Alterna el estado de activación de la vacante (activar/desactivar)
    return this.service.toggleActive(id);
  }
}
