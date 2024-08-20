import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
    const emailLower = email.toLowerCase();

    const client = await this.prismaService.client.findUnique({
      where: { email: emailLower },
    })

    if(!client) throw new BadRequestException('email or password incorrect');

    const authentic = await bcrypt.compare(
      password,
      client.password,
    );

    if(!authentic) {
      throw new UnauthorizedException('email or password incorrect');
    }

    const payload = {
      sub: client.id,
      name: client.name,
    }

    const result = await this.jwtService.signAsync(payload);

    return { token: result }
  }
}
