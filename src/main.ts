import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';
import { ConfigKeys, TConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService<TConfig>>(ConfigService);

  const nodeEnv = config.get<TConfig[ConfigKeys.NODE_ENV]>(ConfigKeys.NODE_ENV);
  const port = config.get<TConfig[ConfigKeys.PORT]>(ConfigKeys.PORT);
  const host = config.get<TConfig[ConfigKeys.HOST]>(ConfigKeys.HOST);

  await app.listen(port!, host!, () => {
    if (nodeEnv !== 'production') {
      console.table({
        port,
        host,
        pid: process.pid,
      });
    }
  });
}
bootstrap();
