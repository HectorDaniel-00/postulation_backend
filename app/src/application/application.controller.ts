import { Controller, Post, Param, ParseIntPipe, Get } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CurrentUser, Message, Roles } from 'src/common/decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiSecurity,
} from '@nestjs/swagger';
import { RoleEnum } from 'src/common/enum';
@ApiTags('Apply')
@ApiBearerAuth('access-token')
@ApiSecurity('x-api-key')
@Controller('applications')
export class ApplicationController {
  // Inyección del servicio de aplicaciones para gestionar las postulaciones de candidatos
  constructor(private readonly applicationService: ApplicationService) {}

  @Message('Se obtuvieron todas las aplicaciones')
  @ApiOperation({ summary: 'Obtener todas las aplicaciones' })
  @ApiResponse({ status: 200, description: 'Aplicaciones encontradas.' })
  @Roles(RoleEnum.ADMIN, RoleEnum.GESTOR)
  @Get()
  async findAll() {
    return this.applicationService.findAll();
  }

  @Message('Se aplico con exito a la vacante')
  @ApiOperation({ summary: 'Aplicar a una vacante' })
  @ApiResponse({ status: 201, description: 'Aplicación exitosa.' })
  @ApiResponse({ status: 404, description: 'Vacante no encontrada.' })
  @Roles(RoleEnum.CODER) // Solo los usuarios con rol de CODER (candidatos) pueden aplicar
  @Post(':vacancyId/')
  async applyToVacancy(
    @Param('vacancyId', ParseIntPipe) vacancyId: string,
    // Obtiene automáticamente el ID del usuario autenticado de la sesión
    @CurrentUser() user: { id: string },
  ) {
    // Procesa la postulación del usuario a la vacante especificada
    return this.applicationService.apply(user.id, vacancyId);
  }

  @Message('')
  @ApiOperation({ summary: 'Obtener aplicaciones de un usuario' })
  @ApiResponse({ status: 200, description: 'Aplicaciones encontradas.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Roles(RoleEnum.ADMIN, RoleEnum.GESTOR, RoleEnum.CODER)
  @Get('me/:userId')
  async findAllByUser(@Param('userId') userId: string) {
    return this.applicationService.findAllByUser(userId);
  }
}
