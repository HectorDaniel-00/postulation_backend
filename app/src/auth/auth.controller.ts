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
  // El constructor inyecta el servicio AuthService para manejar la lógica de negocio
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered.',
    schema: {
      example: {
        succes: true,
        status: 201,
        path: '/api/auth/register',
        message: 'User successfully registered',
        data: {
          name: 'jhon doe',
          email: 'jhondoe@gmail.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data.',
    schema: {
      example: {
        success: false,
        status: 400,
        path: '/api/auth/register',
        message: 'Invalid data',
        method: 'POST',
        error: {
          code: 'INVALID',
          message: 'Data invalid',
        },
      },
    },
  })
  @Post('register')
  @Public() // Endpoint público (no requiere token previo)
  @Message('User successfully registered')
  create(@Body() dto: AuthRegisterDto) {
    // Llama al servicio para registrar un nuevo usuario
    const auth = this.authService.register(dto);
    // Transforma el resultado a una instancia de AuthResponseDto filtrando campos no deseados
    return plainToInstance(AuthResponseDto, auth, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOperation({ summary: 'Log in' })
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials.',
    schema: {
      example: {
        succes: false,
        status: 401,
        path: '/api/auth/login',
        method: 'POST',
        error: {
          code: 'UNATIZATION',
          message: 'Invalid credentials.',
        },
      },
    },
  })
  @Post('login')
  @Public() // Endpoint público
  @Message('User logged in successfully')
  login(@Body() dto: AuthLoginDto) {
    // Llama al servicio para validar credenciales y obtener el token
    const auth = this.authService.login(dto);
    // Transforma el resultado para la respuesta
    return plainToInstance(AuthResponseDto, auth, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOperation({ summary: 'Log in' })
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @Get('me')
  @Public()
  @Roles(RoleEnum.ADMIN, RoleEnum.CODER, RoleEnum.GESTOR)
  me(@CurrentUser() data: AuthResponseDto) {
    // Retorna los datos del usuario actual obtenidos mediante el decorador @CurrentUser
    return plainToInstance(AuthResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
