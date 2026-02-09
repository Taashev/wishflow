import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { ENV_FILE_PATH } from '../../shared/constants';
import { validateConfig } from '../config/validate-config';

import { loadDataSourceOptions } from './load-options.typeorm';

dotenv.config({ path: ENV_FILE_PATH });

const config = validateConfig(process.env);

export default new DataSource(
  loadDataSourceOptions({
    host: config.POSTGRES_HOST,
    port: config.POSTGRES_PORT,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    db: config.POSTGRES_DB,
  }),
);
