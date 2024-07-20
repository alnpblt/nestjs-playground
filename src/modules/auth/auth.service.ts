import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/prisma/prisma/prisma.service';
import { LoginAuthDto } from './dto/login.auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const account = await this.prisma.users.findFirst({
      where: { email: loginAuthDto.email },
    });
    if (account === null) {
      throw new NotFoundException('Account not found');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: account.id,
      user: account,
    });

    return {
      account: account,
      token: {
        access: accessToken,
        type: 'Bearer',
      },
    };
  }
}
