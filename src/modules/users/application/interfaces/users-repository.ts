import { User } from '../../domain/entities/user.entity';

export interface IUsersRepository {
  save(user: User): Promise<void>;
}
