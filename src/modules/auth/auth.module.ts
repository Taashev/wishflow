import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from '../users/users.module';

import { SignupUseCase } from './application/usecases/signup.usecase';
import { AuthController } from './infrastructure/auth.controller';
import { PASSWORD_SERVICE, SIGNUP_USECASE } from './infrastructure/constants';
import { PasswordService } from './infrastructure/password.service';

@Module({
  imports: [ConfigModule, UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: PASSWORD_SERVICE,
      useClass: PasswordService,
    },
    {
      provide: SIGNUP_USECASE,
      useClass: SignupUseCase,
    },
  ],
})
export class AuthModule {}
