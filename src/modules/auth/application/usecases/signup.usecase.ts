import { Inject, Injectable } from '@nestjs/common';

import type { IUsersRepository } from '../../../users/application/interfaces';
import { User } from '../../../users/domain/entities/user.entity';
import { USERS_REPOSITORY } from '../../../users/infrastructure/constants';
import { PASSWORD_SERVICE } from '../../infrastructure/constants';
import { SignupDto } from '../../infrastructure/dto/signup.dto';
import type { IPasswordService } from '../interfaces';

@Injectable()
export class SignupUseCase {
  constructor(
    @Inject(PASSWORD_SERVICE) private passwordService: IPasswordService,
    @Inject(USERS_REPOSITORY) private usersRepository: IUsersRepository,
  ) {}

  async execute(signupDto: SignupDto) {
    const hashPassword = await this.passwordService.hash(signupDto.password);

    const user = User.create({
      userId: crypto.randomUUID(),
      password: hashPassword,
      email: signupDto.email,
      username: signupDto.username,
      avatar: signupDto.avatar,
      about: signupDto.about,
    });

    await this.usersRepository.save(user);
  }
}
