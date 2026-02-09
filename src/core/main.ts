import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigType } from './config/validate-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService<ConfigType> =
    app.get<ConfigService<ConfigType>>(ConfigService);

  const nodeEnv = config.getOrThrow<string>('NODE_ENV');
  const host = config.getOrThrow<string>('APP_HOST');
  const port = config.getOrThrow<number>('APP_PORT');

  await app.listen(port, host, () => {
    if (nodeEnv !== 'production') {
      console.table({
        host,
        port,
      });
    }
  });
}
bootstrap();
