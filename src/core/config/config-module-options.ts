import { ConfigModuleOptions } from '@nestjs/config';

import { ENV_FILE_PATH } from '../constants';

import { validateConfig } from './validate-config';

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: ENV_FILE_PATH,
  validate: (config) => validateConfig(config),
};
