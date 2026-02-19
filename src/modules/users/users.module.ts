import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { USERS_REPOSITORY } from './infrastructure/constants';
import { TypeormUserEntity } from './infrastructure/database/entities/typeorm-user.entity';
import { TypeormUsersRepository } from './infrastructure/database/typeorm-users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeormUserEntity])],
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: TypeormUsersRepository,
    },
  ],
  exports: [USERS_REPOSITORY],
})
export class UsersModule {}
