// src/seed/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';
import { seedUsers } from './seeders/user.seeder';
import { seedVacancies } from './seeders/vacancy.seeder';
import { RoleEnum } from '@common/enum';

async function seed() {
  console.log(' Iniciando seed de la base de datos...\n');

  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  try {
    const users = await seedUsers(dataSource);
    const gestor = users.find((u) => u.role === RoleEnum.GESTOR);

    await seedVacancies(
      dataSource,
      gestor?.id ?? 'd05997aa-cf08-4a49-ab44-32795b400d9a',
    );

    console.log('\n Seed completado exitosamente');
  } catch (error) {
    console.error('\n Error durante el seed:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

seed();
