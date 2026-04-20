import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'super-tainata-duma-za-nashata-diplomna-rabota', // Това е ключът, с който криптираме токените
      signOptions: { expiresIn: '1d' }, // Токенът ще е валиден 1 ден
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}