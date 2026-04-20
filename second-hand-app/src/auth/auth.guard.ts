import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('Нямате достъп! Първо трябва да влезете в профила си.');
    }
    
    try {
      // Проверяваме дали токенът е истински, използвайки нашата тайна дума
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'super-tainata-duma-za-nashata-diplomna-rabota'
      });
      // Закачаме данните на потребителя (ID и email) към заявката
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Невалиден или изтекъл токен.');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}