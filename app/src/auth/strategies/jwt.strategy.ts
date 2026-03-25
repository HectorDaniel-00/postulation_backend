import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthPayloadDto } from '../dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') as string,
    });
  }

  async validate(payload: AuthPayloadDto): Promise<AuthPayloadDto> {
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    const id = payload.id!;
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new UnauthorizedException('Unauthorized user');
    }
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
