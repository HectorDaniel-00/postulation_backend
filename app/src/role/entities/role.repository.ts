/**
 * 
 * 
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(RoleEntity) private readonly repo: Repository<RoleEntity>,
  ) {}

  async createRole(dto: CreateRoleDto): Promise<RoleEntity> {
    const role = this.repo.create({ name: dto.name });
    return await this.repo.save(role);
  }

  async findAll(): Promise<RoleEntity[] | null> {
    return await this.repo.find();
  }

  async findByName(name: string): Promise<RoleEntity | null> {
    return await this.repo.findOne({ where: { name } });
  }
}

*/
