/**
 * 
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleRepository } from './entities/role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly repo: RoleRepository) {}

  async create(dto: CreateRoleDto) {
    const role = await this.repo.findByName(dto.name);
    if (role) {
      throw new ConflictException(
        'El nombre del rol ya existe ingrese un nombre distinto',
      );
    }

    return await this.repo.createRole(dto);
  }

  async findAll() {
    const role = await this.repo.findAll();

    if (role!.length <= 0) {
      throw new BadRequestException('La lista de roles esta vacia');
    }
    return role;
  }

  async findByName(name: string) {
    const role = await this.repo.findByName(name);
    if (!role) {
      throw new NotFoundException(`El rol con el nombre ${name} no existe`);
    }
    return role;
  }
}

  */
