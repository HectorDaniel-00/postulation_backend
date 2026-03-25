// src/seed/seeders/user.seeder.ts
import { DataSource } from 'typeorm';
import { UserEntity } from '../../../user/entities/user.entity';
import usersData from '../data/users.json';
import { Logger } from '@nestjs/common';
import { RoleEnum } from '@common/enum';
import * as bcrypt from 'bcrypt'; // descomentar si usas hash

export async function seedUsers(dataSource: DataSource) {
  const logger = new Logger(seedUsers.name);
  const repo = dataSource.getRepository(UserEntity);

  try {
    const count = await repo.count();

    if (count > 0) {
      logger.log('Usuarios ya existen, saltando...');
      return await repo.find();
    }

    const usersWithRole = await Promise.all(
      usersData.map(async (user) => {
        const normalizedRole = user.role?.toUpperCase();

        // Validar rol
        const role = Object.values(RoleEnum).includes(
          normalizedRole as RoleEnum,
        )
          ? (normalizedRole as RoleEnum)
          : RoleEnum.CODER;

        if (!Object.values(RoleEnum).includes(normalizedRole as RoleEnum)) {
          logger.warn(
            `Rol inválido para ${user.email}, usando CODER por defecto`,
          );
        }

        return {
          name: user.name,
          email: user.email.toLowerCase().trim(),
          password: await bcrypt.hash(user.password, 10),
          role,
        };
      }),
    );

    const users = await repo.save(usersWithRole);

    logger.log(`${users.length} usuarios insertados correctamente`);
    return users;
  } catch (error) {
    logger.error('Error al ejecutar seed de usuarios', error);
    throw error;
  }
}
