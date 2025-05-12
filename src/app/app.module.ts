import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { appConfig } from '../config/app.config';

@Module({
  imports: [ConfigModule.forRoot(appConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
