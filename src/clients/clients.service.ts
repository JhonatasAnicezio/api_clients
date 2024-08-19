import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { PrismaService } from 'src/database/PrismaService';
import { FindClientDto } from './dto/find-client-dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prismaService: PrismaService) {}  

  async create(createClientDto: CreateClientDto): Promise<FindClientDto> {
    const clientExist = await this.prismaService.client.findFirst({
      where: {
        email: createClientDto.email,
      },
    })

    if(clientExist) {
      throw new Error('Client exist');
    }

    return await this.prismaService.client.create({
      data: {
        ...createClientDto,
        role: 'user'
      },
    });
  }

  async findAll(): Promise<FindClientDto[]> {
    const clients = await this.prismaService.client.findMany({
      where: {
        role: { not: 'admin' }
      },
      select: {
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    return clients;
  }

  async findOne(id: string): Promise<FindClientDto> {

    try {
      const client = await this.prismaService.client.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
        }
      });
      
      return client;
    } catch (error) {
      throw new NotFoundException('client not found');
    }
  }

  async delete(id: string) {
    await this.prismaService.client.delete({
      where: { id },
    })

    return 'delete';
  }
}
