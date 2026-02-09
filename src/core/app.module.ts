import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configModuleOptions } from './config/config-module-options';
import { typeOrmModuleOptions } from './database/typeorm-module-options';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
