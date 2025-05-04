import { Response } from 'express';
import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { LoginInput } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  private async verifyUser(email, password) {
    try {
      const user = await this.usersService.getUser({ email });
      const authenticated = await compare(password, user.password);

      if (!authenticated) {
        throw new Error('Invalid credentials');
      }

      return user;
    } catch (error) {
      throw new Error('Verification failed with error: ' + error);
    }
  }

  async login({ email, password }: LoginInput, res: Response) {
    const user = await this.verifyUser(email, password);
    const expires = new Date();
    expires.setMilliseconds(
      expires.getTime() +
        parseInt(this.configService.getOrThrow<string>('JWT_EXPIRES_IN')),
    );
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };
    const accessToken = this.jwtService.sign(tokenPayload);
    res.cookie('Authentication', accessToken, {
      expires,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      httpOnly: true,
    });
    return user;
  }
}
