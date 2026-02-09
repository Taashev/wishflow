import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

export const loadDataSourceOptions = (config: {
  user: string;
  password: string;
  host: string;
  port: number;
  db: string;
}): DataSourceOptions => ({
  type: 'postgres',
  url: `postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.db}`,
  synchronize: false,
  migrationsRun: false,
  entities: [join(__dirname, '../../**/*.entity.{ts,js}')],
  migrations: [join(__dirname, './migrations/*.{ts,js}')],
});
