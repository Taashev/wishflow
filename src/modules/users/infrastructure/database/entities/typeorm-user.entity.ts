import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import {
  ABOUT_MAX_LENGTH,
  AVATAR_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
} from '../../../domain/user.rules';
import {
  CONSTRAINT_USERS_EMAIL_UQ,
  CONSTRAINT_USERS_USER_ID_PK,
  CONSTRAINT_USERS_USERNAME_UQ,
} from '../constants';

@Entity({ name: 'users' })
@Unique(CONSTRAINT_USERS_EMAIL_UQ, ['email'])
@Unique(CONSTRAINT_USERS_USERNAME_UQ, ['username'])
export class TypeormUserEntity {
  @PrimaryColumn('uuid', {
    name: 'user_id',
    primaryKeyConstraintName: CONSTRAINT_USERS_USER_ID_PK,
  })
  userId: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: EMAIL_MAX_LENGTH, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: USERNAME_MAX_LENGTH, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: PASSWORD_MAX_LENGTH, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: AVATAR_MAX_LENGTH, nullable: false })
  avatar: string;

  @Column({ type: 'varchar', length: ABOUT_MAX_LENGTH, nullable: false })
  about: string;
}
