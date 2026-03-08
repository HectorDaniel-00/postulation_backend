import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto, AuthResponseDto } from './dto';
import { CurrentUser, Message, Public, Roles } from 'src/common/decorator';
import { plainToInstance } from 'class-transformer';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoleEnum } from 'src/common/enum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @Post('register')
  @Public()
  @Message('Usuario registrado correctamente')
  create(@Body() dto: AuthRegisterDto) {
    const auth = this.authService.register(dto);
    return plainToInstance(AuthResponseDto, auth, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  @Post('login')
  @Public()
  @Message('Usuario logueado correctamente')
  login(@Body() dto: AuthLoginDto) {
    const auth = this.authService.login(dto);
    return plainToInstance(AuthResponseDto, auth, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  @Get('me')
  @Roles(RoleEnum.ADMIN, RoleEnum.CODER, RoleEnum.GESTOR)
  me(@CurrentUser() data: AuthResponseDto) {
    return plainToInstance(AuthResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
