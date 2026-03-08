import { BadRequestException, Injectable } from '@nestjs/common';
import { ApplicationRepository } from './entities/application.repository';

@Injectable()
export class ApplicationService {
  constructor(private readonly repo: ApplicationRepository) {}

  async apply(userId: string, vacancyId: string) {
    const dto = { userId, vacancyId };
    const alreadyApplied = await this.repo.hasUserApplied(dto);

    if (alreadyApplied) {
      throw new BadRequestException('Ya aplicaste a esta vacante');
    }

    return this.repo.applyToVacancy(dto);
  }
}
