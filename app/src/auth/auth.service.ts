import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthPayloadDto, AuthRegisterDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwt: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async register(data: AuthRegisterDto) {
    return await this.userService.create(data);
  }

  async login(authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      this.logger.error('invalid credentials in email or password');
      throw new UnauthorizedException(
        'invalid credentials in email or password',
      );
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      this.logger.error('invalid credentials in email or password');
      throw new UnauthorizedException(
        'invalid credentials in email or password',
      );
    }
    const payload: AuthPayloadDto = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await this.jwt.signAsync(payload);
    return {
      access_token: token,
    };
  }
}
