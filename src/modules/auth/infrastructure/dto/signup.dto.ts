import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Trim } from '../../../../shared/decorators/validator';
import {
  ABOUT_MAX_LENGTH,
  ABOUT_MIN_LENGTH,
  AVATAR_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '../../../users/domain/user.rules';

export class SignupDto {
  @Trim()
  @Expose()
  @IsEmail()
  @MaxLength(EMAIL_MAX_LENGTH)
  email: string;

  @Trim()
  @Expose()
  @IsString()
  @MinLength(USERNAME_MIN_LENGTH)
  @MaxLength(USERNAME_MAX_LENGTH)
  username: string;

  @Trim()
  @Expose()
  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH)
  @MaxLength(PASSWORD_MAX_LENGTH)
  password: string;

  @Trim()
  @Expose()
  @IsUrl()
  @MaxLength(AVATAR_MAX_LENGTH)
  @IsOptional()
  avatar?: string;

  @Trim()
  @Expose()
  @IsString()
  @MinLength(ABOUT_MIN_LENGTH)
  @MaxLength(ABOUT_MAX_LENGTH)
  @IsOptional()
  about?: string;
}
