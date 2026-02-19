import { ABOUT_DEFAULT_VALUE, AVATAR_DEFAULT_VALUE } from '../user.rules';

export type UserProps = {
  userId: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
  about: string;
};

type CreateUserProps = Omit<UserProps, 'avatar' | 'about'> &
  Partial<Pick<UserProps, 'avatar' | 'about'>>;

export class User {
  public readonly userId: string;
  public readonly email: string;
  public readonly username: string;
  private password: string;
  public readonly avatar: string;
  public readonly about: string;

  private constructor(props: UserProps) {
    this.userId = props.userId;
    this.email = props.email;
    this.username = props.username;
    this.password = props.password;
    this.avatar = props.avatar;
    this.about = props.about;
  }

  getPassword() {
    return this.password;
  }

  static create(props: CreateUserProps) {
    let avatar = AVATAR_DEFAULT_VALUE;
    let about = ABOUT_DEFAULT_VALUE;

    if (!props.userId) {
      throw new Error('Нельзя создать пользователя без userId');
    }

    if (!props.email) {
      throw new Error('Нельзя создать пользователя без email');
    }

    if (!props.username) {
      throw new Error('Нельзя создать пользователя без username');
    }

    if (!props.password) {
      throw new Error('Нельзя создать пользователя без password');
    }

    if (props.avatar) {
      avatar = props.avatar;
    }

    if (props.about) {
      about = props.about;
    }

    return new User({
      ...props,
      avatar,
      about,
    });
  }

  static restore(props: UserProps) {
    return new User(props);
  }
}
