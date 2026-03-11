import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApikeyGuard implements CanActivate {
  private readonly logger = new Logger(ApikeyGuard.name);
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey || apiKey !== process.env.API_KEY) {
      this.logger.error('API KEY INVALIDA');
      throw new UnauthorizedException('No tienes permiso');
    }

    return true;
  }
}
