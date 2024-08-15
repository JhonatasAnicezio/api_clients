import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationDto } from './dto/authentication.dto';
import { PrismaService } from 'src/database/PrismaService';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: AuthenticationDto) {
    const client = await this.prismaService.client.findUnique({
      where: { email },
    })

    const authentic = await bcrypt.compare(
      password,
      client.password,
    );

    if(!authentic) {
      throw new UnauthorizedException('email or password incorrect');
    }

    const payload = {
      sub: client.id,
      nameUser: client.name,
    }

    return await this.jwtService.signAsync(payload);
  }
}
