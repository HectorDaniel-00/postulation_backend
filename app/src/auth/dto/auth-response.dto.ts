import { Exclude, Expose } from 'class-transformer';

export class AuthResponseDto {
  @Expose()
  id?: string;

  @Expose()
  name?: string;

  @Expose()
  email?: string;

  @Exclude()
  password: string;

  @Expose()
  role?: string;

  @Expose()
  access_token?: string;
}
