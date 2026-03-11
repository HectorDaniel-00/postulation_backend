import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VacancyEntity } from './vacancy.entity';
import { Repository } from 'typeorm';
import { CreateVacancyDto, UpdateVacancyDto } from '../dto';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class VacancyRepository {
  constructor(
    @InjectRepository(VacancyEntity)
    private readonly repo: Repository<VacancyEntity>,
  ) {}

  async create(dto: CreateVacancyDto): Promise<VacancyEntity> {
    const data = this.repo.create(dto);
    return await this.repo.save(data);
  }

  async findAll(): Promise<VacancyEntity[] | null> {
    return await this.repo.find();
  }

  async findOne(id: string): Promise<VacancyEntity | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async findOneByName(title: string): Promise<VacancyEntity | null> {
    return await this.repo.findOne({ where: { title } });
  }

  async toggleActive(id: string): Promise<VacancyEntity | null> {
    return await this.repo.findOne({ where: { id, isActive: true } });
  }

  async update(
    id: string,
    dto: UpdateVacancyDto,
  ): Promise<VacancyEntity | null> {
    const update = { id, ...dto };
    return await this.repo.save(update);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}
