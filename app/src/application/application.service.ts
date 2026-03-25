import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApplicationRepository } from './entities/application.repository';

@Injectable()
export class ApplicationService {
  constructor(private readonly repo: ApplicationRepository) {}

  // Lógica de negocio para procesar una postulación
  async apply(userId: string, vacancyId: string) {
    const dto = { userId, vacancyId };

    // Verifica si el usuario ya se postuló previamente para evitar duplicados
    const alreadyApplied = await this.repo.hasUserApplied(dto);

    if (alreadyApplied) {
      throw new BadRequestException('Ya aplicaste a esta vacante');
    }

    // Registra la postulación en la base de datos
    return this.repo.applyToVacancy(dto);
  }

  async findAll() {
    const applications = await this.repo.findAll();
    if (!applications) {
      throw new NotFoundException('Applications not found');
    }
    return applications;
  }

  async findAllByUser(id: string) {
    if (!id) {
      throw new NotFoundException('User not found');
    }
    return this.repo.findAllByUser(id);
  }

  async findAllByVacancy(id: string) {
    if (!id) {
      throw new NotFoundException('Vacancy not found');
    }
    return this.repo.findAllByVacancy(id);
  }
}
