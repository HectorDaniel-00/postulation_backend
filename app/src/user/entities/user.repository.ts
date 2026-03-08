import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto): Promise<UserEntity> {
    const newUser = this.repo.create(data);
    return await this.repo.save(newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.repo.find({});
  }

  async findOne(id: string): Promise<UserEntity | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async updatePassword(id: string, newPassword: string): Promise<boolean> {
    const update = await this.repo.update(id, { password: newPassword });

    return update.affected === 1;
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return await this.repo.findOne({ where: { email } });
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity | null> {
    const updateUser = { id, ...data };
    return await this.repo.save(updateUser);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}
