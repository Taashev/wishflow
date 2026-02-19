import { Body, Controller, Inject, Post } from '@nestjs/common';

import { SignupUseCase } from '../application/usecases/signup.usecase';

import { SIGNUP_USECASE } from './constants';
import { SignupDto } from './dto/signup.dto';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(@Inject(SIGNUP_USECASE) private signupUseCase: SignupUseCase) {}

  @Post('/signup')
  async createUser(@Body() signupDto: SignupDto) {
    await this.signupUseCase.execute(signupDto);
  }
}
