import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;


    if (username === 'test' && password === 'test') {
      const payload = { username };
      const token = this.jwtService.sign(payload);
      return { access_token: token };
    } else {
      throw new Error('Credenciales incorrectas');
    }
  }
}
