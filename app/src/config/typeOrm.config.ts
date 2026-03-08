import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig = (config: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: config.get<string>('database.host'),
    port: config.get<number>('database.port'),
    username: config.get<string>('database.username'),
    password: config.get<string>('database.password'),
    database: config.get<string>('database.name'),
    autoLoadEntities: true,
    synchronize: true,
  };
};

export default typeOrmConfig;
