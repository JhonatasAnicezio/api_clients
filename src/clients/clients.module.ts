import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaService } from 'src/database/PrismaService';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService, ConfigService],
})
export class ClientsModule {}
