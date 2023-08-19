import { Injectable, CanActivate, ExecutionContext, Logger  } from '@nestjs/common';
import { JWT_SECRET } from 'src/utils/constants';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['accessToken'];

    if (!token) {
      this.logger.warn('No access token cookie found.');
      return false;
    }

    this.logger.debug('Access token cookie:', token);

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      request.user = decoded;
      return true;
    } catch (error) {
      this.logger.error('Error verifying access token:', error.message);
      return false;
    }
  }
}