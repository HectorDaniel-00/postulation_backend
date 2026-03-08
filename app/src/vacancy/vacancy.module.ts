import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import { VacancyRepository } from './entities/vacancy.repositoty';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyEntity } from './entities/vacancy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VacancyEntity])],
  controllers: [VacancyController],
  providers: [VacancyService, VacancyRepository],
  exports: [VacancyService],
})
export class VacancyModule {}
