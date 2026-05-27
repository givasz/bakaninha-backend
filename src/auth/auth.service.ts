import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(username: string, password: string) {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'bakaninha2024';

    if (username !== adminUsername) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Support both plain and hashed passwords
    const isValid =
      password === adminPassword ||
      (await bcrypt.compare(password, adminPassword).catch(() => false));

    if (!isValid && password !== adminPassword) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { username, role: 'admin' };
    return {
      access_token: this.jwtService.sign(payload),
      username,
    };
  }
}
