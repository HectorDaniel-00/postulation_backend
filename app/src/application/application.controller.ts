import { Controller, Post, Param, ParseIntPipe } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CurrentUser, Message, Roles } from 'src/common/decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RoleEnum } from 'src/common/enum';

@ApiTags('Apply')
@ApiBearerAuth('access-token')
@Controller('apply')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Message('Se aplico con exito a la vacante')
  @ApiOperation({ summary: 'Aplicar a una vacante' })
  @ApiResponse({ status: 201, description: 'Aplicación exitosa.' })
  @ApiResponse({ status: 404, description: 'Vacante no encontrada.' })
  @Roles(RoleEnum.ADMIN, RoleEnum.CODER, RoleEnum.GESTOR)
  @Post(':vacancyId/')
  async applyToVacancy(
    @Param('vacancyId', ParseIntPipe) vacancyId: string,
    @CurrentUser() user: { id: string },
  ) {
    return this.applicationService.apply(user.id, vacancyId);
  }
}
