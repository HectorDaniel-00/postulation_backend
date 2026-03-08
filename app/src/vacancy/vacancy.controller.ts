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
} from '@nestjs/swagger';
import { Message } from 'src/common/decorator';
import { AuthRoleGuard } from 'src/common/guard/role.guard';
import { RoleEnum } from 'src/common/enum';

@ApiTags('Vacancies')
@Controller('vacancies')
export class VacancyController {
  constructor(private readonly service: VacancyService) {}

  @Message('Vacante creada con exito')
  @ApiOperation({ summary: 'Crear una nueva vacante' })
  @ApiResponse({ status: 201, description: 'Vacante creada exitosamente.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @ApiBearerAuth('access-token')
  @Post()
  @Roles(RoleEnum.ADMIN, RoleEnum.GESTOR)
  @UseGuards(AuthRoleGuard)
  create(@Body() dto: CreateVacancyDto) {
    return this.service.create(dto);
  }

  @Message('Exito a obtener todas las vacantes')
  @ApiOperation({ summary: 'Obtener todas las vacantes' })
  @ApiResponse({ status: 200, description: 'Lista de vacantes.' })
  @Public()
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Message('exito a obtener vacante por id')
  @ApiOperation({ summary: 'Obtener una vacante por ID' })
  @ApiResponse({ status: 200, description: 'Detalles de la vacante.' })
  @ApiResponse({ status: 404, description: 'Vacante no encontrada.' })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
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
  @Roles(RoleEnum.ADMIN, RoleEnum.GESTOR)
  @UseGuards(AuthRoleGuard)
  update(@Param('id') id: string, @Body() dto: UpdateVacancyDto) {
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
    return this.service.toggleActive(id);
  }
}
