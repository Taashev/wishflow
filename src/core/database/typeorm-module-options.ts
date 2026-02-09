import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { ConfigType } from '../config/validate-config';

import { loadDataSourceOptions } from './load-options.typeorm';

export const typeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService<ConfigType>) => {
    return loadDataSourceOptions({
      host: config.getOrThrow('POSTGRES_HOST'),
      port: config.getOrThrow('POSTGRES_PORT'),
      user: config.getOrThrow('POSTGRES_USER'),
      password: config.getOrThrow('POSTGRES_PASSWORD'),
      db: config.getOrThrow('POSTGRES_DB'),
    });
  },
  inject: [ConfigService],
};
