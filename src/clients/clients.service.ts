import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/database/PrismaService';
import { FindClientDto } from './dto/find-client-dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prismaService: PrismaService) {}  

  async create(createClientDto: CreateClientDto) {
    const clientExist = await this.prismaService.client.findFirst({
      where: {
        email: createClientDto.email,
      }
    })

    if(clientExist) {
      throw new Error('Client exist');
    }

    await this.prismaService.client.create({
      data: {
        ...createClientDto,
        role: 'user'
      }
    });
  }

  async findAll(): Promise<FindClientDto[]> {
    const clients = await this.prismaService.client.findMany();
    
    const findClientDtos = clients.map(client => ({
      name: client.name,
      email: client.email,
      phone: client.phone,
      role: client.role,
    }));

    return findClientDtos;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
