import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(email: string, pass: string) {
    // 1. Търсим потребителя в базата
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Грешен имейл или парола');
    }

    // 2. Сравняваме въведената парола с криптираната в базата данни
    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Грешен имейл или парола');
    }

    // 3. Ако всичко е точно, генерираме токена
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { id: user.id, email: user.email, firstName: user.firstName } // Връщаме и малко данни за профила
    };
  }
}