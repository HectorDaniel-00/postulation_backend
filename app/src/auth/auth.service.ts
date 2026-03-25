import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthPayloadDto, AuthRegisterDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, // Inyección del servicio de usuarios para buscar y crear perfiles
    private jwt: JwtService, // Servicio de NestJS para la gestión de tokens JWT
  ) {}
  private readonly logger = new Logger(AuthService.name);

  // Método para registrar un nuevo usuario delegando la creación al UserService
  async register(data: AuthRegisterDto) {
    return await this.userService.create(data);
  }

  // Método para manejar el inicio de sesión
  async login(authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;

    // Busca al usuario por su correo electrónico
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      this.logger.error('invalid credentials in email or password');
      throw new UnauthorizedException(
        'invalid credentials in email or password',
      );
    }

    // Compara la contraseña enviada con el hash guardado en la base de datos
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      this.logger.error('invalid credentials in email or password');
      throw new UnauthorizedException(
        'invalid credentials in email or password',
      );
    }

    // Define la carga (payload) del token con información básica útil
    const payload: AuthPayloadDto = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // Genera y firma el token JWT de forma asíncrona
    const token = await this.jwt.signAsync(payload);
    return {
      access_token: token,
    };
  }
}
