import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationEntity } from './application.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicationRepository {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly repo: Repository<ApplicationEntity>,
  ) {}

  async hasUserApplied(dto: CreateApplicationDto): Promise<boolean> {
    return (
      (await this.repo.count({
        where: {
          user: { id: dto.userId },
          vacancy: { id: dto.vacancyId },
        },
      })) > 0
    );
  }

  async findByUserAndVacancy(userId: string, vacancyId: string) {
    return this.repo.findOne({
      where: {
        user: { id: userId },
        vacancy: { id: vacancyId },
      },
    });
  }

  async findAllByUser(userId: string) {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['vacancy'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAllByVacancy(vacancyId: string) {
    return this.repo.find({
      where: { vacancy: { id: vacancyId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async applyToVacancy(dto: CreateApplicationDto) {
    const data = this.repo.create({
      user: { id: dto.userId },
      vacancy: { id: dto.vacancyId },
    });

    return this.repo.save(data);
  }
}
