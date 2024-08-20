import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaService } from 'src/database/PrismaService';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'SECRET',
      signOptions: { expiresIn: '72h' },
    })
  ],
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService, ConfigService],
})
export class ClientsModule {}
