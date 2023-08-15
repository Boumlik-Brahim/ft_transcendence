import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenBlacklistService } from '../token-blacklist.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly tokenBlacklistService: TokenBlacklistService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    
    if (!token || this.tokenBlacklistService.isBlacklisted(token)) {
      return false;
    }
    return true;
  }
}