import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { IUsersRepository } from '../../application/interfaces';
import { User } from '../../domain/entities/user.entity';

import { TypeormUserEntity } from './entities/typeorm-user.entity';

@Injectable()
export class TypeormUsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(TypeormUserEntity)
    private usersRepository: Repository<TypeormUserEntity>,
  ) {}

  async save(user: User) {
    const typeormEntity = this.createTypeormEntity(user);
    await this.usersRepository.save(typeormEntity);
  }

  private createTypeormEntity(user: User): TypeormUserEntity {
    const entity = {
      userId: user.userId,
      email: user.email,
      username: user.username,
      password: user.getPassword(),
      avatar: user.avatar,
      about: user.about,
    };

    return this.usersRepository.create(entity);
  }
}
