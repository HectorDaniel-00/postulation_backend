import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { VacancyRepository } from './entities/vacancy.repositoty';

@Injectable()
export class VacancyService {
  constructor(private readonly repo: VacancyRepository) {}
  private readonly logger = new Logger(VacancyService.name);

  // Crea una nueva vacante en el repositorio
  async create(dto: CreateVacancyDto, userId: string) {
    const newVacancy = {
      ...dto,
      user: { id: userId },
    };

    return await this.repo.create(newVacancy);
  }

  // Recupera todas las vacantes; lanza excepción si no hay ninguna
  async findAll() {
    const data = await this.repo.findAll();
    if (data!.length === 0) {
      this.logger.error('Lista de vacantes vacias');
      throw new NotFoundException('No hay vacantes disponible');
    }
    return data;
  }

  // Busca una vacante por ID; valida que el ID exista y se encuentre en la BD
  async findOne(id: string) {
    if (!id) {
      this.logger.error('El campo del id es requerido');
      throw new BadRequestException(
        'El campo requerido esta incompleto o incorrecto',
      );
    }
    const data = await this.repo.findOne(id);
    if (!data) {
      this.logger.error(
        `Error, La vacante con el id ${id} no existe, vuelva a intentarlo con otro id`,
      );
      throw new NotFoundException('No existe esta vacante');
    }
    return data;
  }

  // Busca una vacante por su título exacto
  async findOneByTitle(title: string) {
    if (!title) {
      this.logger.error('El campo del titulo esta vacio');
      throw new BadRequestException(
        'El campo requerido esta incompleto o incorrecto',
      );
    }
    const data = await this.repo.findOneByName(title);

    if (!data) {
      this.logger.error(`La vacante con el titulo de ${title} no existe`);
      throw new NotFoundException('No existe la vacante');
    }
    return data;
  }

  // Activa o desactiva una vacante para controlar su visibilidad o disponibilidad
  async toggleActive(id: string) {
    if (!id) {
      this.logger.error('el campo del id esta icompleto');
      throw new BadRequestException(
        'El campo requerido esta incompleto, por favor verifique e intente nuevamente',
      );
    }
    const data = await this.repo.findOne(id);
    if (!data) {
      this.logger.error(`La vacante con el id ${id} no existe,`);
      throw new NotFoundException('No existe esta vacante');
    }
    return await this.repo.toggleActive(id);
  }

  // Actualiza los campos de una vacante, manteniendo los valores actuales si no se envían nuevos
  async update(id: string, dto: UpdateVacancyDto) {
    if (!id) {
      this.logger.error('El campo del id es requerido');
      throw new BadRequestException(
        'El campo requerido esta incompleto, por favor verifique e intente nuevamente',
      );
    }
    const data = await this.repo.findOne(id);
    if (!data) {
      this.logger.error(`La vacante con el id ${id} no existe`);
      throw new NotFoundException('No se puede modificar esta vacante');
    }

    // Mapeo selectivo de campos para la actualización
    const update: UpdateVacancyDto = {
      title: dto.title! ?? data.title,
      description: dto.description! ?? data.description,
      seniority: dto.seniority! ?? data.seniority,
      softSkills: dto.softSkills! ?? data.softSkills,
      location: dto.location! ?? data.location,
      modality: dto.modality! ?? data.modality,
      salaryRange: dto.salaryRange! ?? data.salaryRange,
      company: dto.company! ?? data.company,
      tecnologies: dto.tecnologies! ?? data.tecnologies,
      isActive: dto.isActive ?? data.isActive,
      maxApplicants: dto.maxApplicants! ?? data.maxApplicants,
    };
    return await this.repo.update(id, update);
  }

  // Elimina una vacante permanentemente de la base de datos
  async remove(id: string) {
    if (!id) {
      this.logger.error('El campo del id es requerido');

      throw new BadRequestException('Campo requerido esta vacio');
    }
    const data = await this.repo.findOne(id);
    if (!data) {
      this.logger.error(`La vacante con el id ${id} no existe,`);
      throw new NotFoundException('No existe esta vacante');
    }
    return await this.repo.delete(id);
  }
}
