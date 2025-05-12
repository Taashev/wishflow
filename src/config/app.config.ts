import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';

// Ключи конфигурации
export enum ConfigKeys {
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',
  HOST = 'HOST',
  SALT = 'SALT',
  JWT_SECRET = 'JWT_SECRET',
  JWT_EXPIRES_IN = 'JWT_EXPIRES_IN',
  POSTGRES_HOST = 'POSTGRES_HOST',
  POSTGRES_PORT = 'POSTGRES_PORT',
  POSTGRES_USER = 'POSTGRES_USER',
  POSTGRES_PASSWORD = 'POSTGRES_PASSWORD',
  POSTGRES_DB = 'POSTGRES_DB',
}

// Схема валидации
export const configSchema = z.object({
  [ConfigKeys.NODE_ENV]: z.enum(['development', 'production', 'testing']),
  [ConfigKeys.PORT]: z.coerce.number().default(3000),
  [ConfigKeys.HOST]: z.string().default('localhost'),
  [ConfigKeys.SALT]: z.coerce.number().default(10),
  [ConfigKeys.JWT_SECRET]: z.string(),
  // валидным являются строки и числа (числа в миллисекундах)
  // валдные строки в формате 1s, 1m, 1h, 1d, 1w
  [ConfigKeys.JWT_EXPIRES_IN]: z.union([z.coerce.number(), z.string()]),
  [ConfigKeys.POSTGRES_HOST]: z.string().default('localhost'),
  [ConfigKeys.POSTGRES_PORT]: z.coerce.number().default(15432),
  [ConfigKeys.POSTGRES_USER]: z.string(),
  [ConfigKeys.POSTGRES_PASSWORD]: z.string(),
  [ConfigKeys.POSTGRES_DB]: z.string(),
});

// Тип конфигурации
export type TConfig = z.infer<typeof configSchema>;

// Функция валидации
const validate = (config: Record<string, any>) => {
  let configParsed: TConfig;

  try {
    configParsed = configSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors = error.errors.map((err) => {
        return `${err.path.join('.')}: ${err.message}`;
      });

      throw new Error(validationErrors.join(', '));
    } else {
      throw error;
    }
  }

  return configParsed;
};

// Конфигурация
export const appConfig: ConfigModuleOptions<TConfig> = {
  cache: false,
  isGlobal: false,
  ignoreEnvFile: false,
  envFilePath: ['.env.development', '.env.testing', '.env.production'],
  validate,
};
