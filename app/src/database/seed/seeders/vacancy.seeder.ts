// src/seed/seeders/vacancy.seeder.ts
import { DataSource } from 'typeorm';
import { VacancyEntity } from '../../../vacancy/entities/vacancy.entity';
import vacanciesData from '../data/vacancy.json';
import { Logger } from '@nestjs/common';
import { ModalityOpcion } from 'src/vacancy/dto';

export async function seedVacancies(dataSource: DataSource, gestorId: string) {
  const logger = new Logger(seedVacancies.name);
  const repo = dataSource.getRepository(VacancyEntity);

  const count = await repo.count();
  if (count > 0) {
    logger.log('  Vacantes ya existen, saltando...');
    const existingVacancies = await repo.find();
    return existingVacancies;
  }

  const vacanciesWithModality = vacanciesData.map((vacancie) => ({
    title: vacancie.title,
    description: vacancie.description,
    seniority: vacancie.seniority,
    softSkills: vacancie.softSkills,
    tecnologies: vacancie.tecnologies,
    location: vacancie.location,
    modality: ModalityOpcion.HIBRIDO,
    salaryRange: vacancie.salaryRange,
    company: vacancie.company,
    maxApplicants: vacancie.maxApplicants,
    user: { id: gestorId },
  }));

  const vacancies = await repo.save(vacanciesWithModality);
  logger.log(` ${vacancies.length} vacantes insertadas`);
  return vacancies;
}
