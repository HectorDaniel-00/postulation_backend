import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { VacancyRepository } from './entities/vacancy.repositoty';

@Injectable()
export class VacancyService {
  constructor(private readonly repo: VacancyRepository) {}
  async create(dto: CreateVacancyDto) {
    const vacanciesNew = { ...dto };
    return await this.repo.create(vacanciesNew);
  }

  async findAll() {
    const data = await this.repo.findAll();
    if (data!.length === 0) {
      throw new NotFoundException('Lista de empleos vacia');
    }
    return data;
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException(
        'El campo requerido esta incompleto o incorrecto',
      );
    }
    const data = await this.repo.findOne(id);
    if (!data) {
      throw new NotFoundException(
        `Error, La vacante con el id ${id} no existe, vuelva a intentarlo con otro id`,
      );
    }
    return data;
  }

  async toggleActive(id: string) {
    if (!id) {
      throw new BadRequestException(
        'El campo requerido esta incompleto, por favor verifique e intente nuevamente',
      );
    }
    const data = await this.repo.findOne(id);
    if (!data) {
      throw new NotFoundException(
        `La vacante con el id ${id} no existe, por favor cambie el dato ingresado y vuelta a intentarlo`,
      );
    }
    return await this.repo.toggleActive(id);
  }

  async update(id: string, dto: UpdateVacancyDto) {
    if (!id) {
      throw new BadRequestException(
        'El campo requerido esta incompleto, por favor verifique e intente nuevamente',
      );
    }
    const data = await this.repo.findOne(id);
    if (!data) {
      throw new NotFoundException(
        `La vacante con el id ${id} no existe, por favor cambie el dato ingresado y vuelta a intentarlo`,
      );
    }
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

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('Campo requerido esta vacio');
    }
    const data = await this.repo.findOne(id);
    if (!data) {
      throw new NotFoundException(
        `La vacante con el id ${id} no existe, cambia el valor y vuelve a intentarlo`,
      );
    }
    return await this.repo.delete(id);
  }
}
