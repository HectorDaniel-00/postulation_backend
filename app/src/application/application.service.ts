import { BadRequestException, Injectable } from '@nestjs/common';
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
}
