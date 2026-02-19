import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

import { ConfigType } from '../../../core/config/validate-config';
import { IPasswordService } from '../application/interfaces/password.service';

@Injectable()
export class PasswordService implements IPasswordService {
  private crypto = bcrypt;
  private salt: number;

  constructor(private config: ConfigService<ConfigType>) {
    this.salt = this.config.getOrThrow<number>('HASH_PASSWORD_SALT');
  }

  async hash(password: string) {
    const hash = await this.crypto.hash(password, this.salt);
    return hash;
  }

  async compare(originalPassword: string, hash: string) {
    const result = await this.crypto.compare(originalPassword, hash);
    return result;
  }
}
