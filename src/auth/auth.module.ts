import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'clavezon',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, AuthGuard, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthGuard],
})
export class AuthModule {}
