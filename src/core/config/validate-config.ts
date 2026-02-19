import z from 'zod';

const configSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']),

  APP_HOST: z.string().default('localhost'),
  APP_PORT: z.coerce.number().default(8080),

  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_DB: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),

  HASH_PASSWORD_SALT: z.coerce.number(),
});

export type ConfigType = z.infer<typeof configSchema>;

export function validateConfig(config: Record<string, any>): ConfigType {
  const configParsed = configSchema.safeParse(config);

  if (configParsed.error !== undefined) {
    throw configParsed.error;
  }

  const appConfig = configParsed.data;

  return appConfig;
}
