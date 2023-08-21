import { Injectable, CanActivate, ExecutionContext, Logger  } from '@nestjs/common';
import { JWT_SECRET } from 'src/utils/constants';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      this.logger.warn('No access token cookie found.');
      return false;
    }

    this.logger.debug('Access token cookie:', accessToken);

    try {
      const decoded = jwt.verify(accessToken, JWT_SECRET);
      request.user = decoded;
      return true;
    } catch (error) {
      this.logger.error('Error verifying access token:', error.message);
      return false;
    }
  }
}