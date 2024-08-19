import { Injectable } from '@nestjs/common';
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

  findOne(id: string) {
    return `This action returns a #${id} client`;
  }
}
