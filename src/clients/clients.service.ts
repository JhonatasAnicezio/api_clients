import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { PrismaService } from 'src/database/PrismaService';
import { FindClientDto } from './dto/find-client-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ClientsService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}  

  async create(createClientDto: CreateClientDto) {
    const emailLower = createClientDto.email.toLowerCase();

    const clientExist = await this.prismaService.client.findFirst({
      where: {
        email: emailLower,
      },
    })

    if(clientExist) {
      throw new BadRequestException('Email ou telefone ja cadastrado');
    }

    try {
      const client = await this.prismaService.client.create({
        data: {
          ...createClientDto,
          role: 'user'
        }
      });

      const payload = {
        sub: client.id,
        name: client.name,
      }
  
      const result = await this.jwtService.signAsync(payload);

      return { token: result };
    } catch (error) {
      throw new BadRequestException('Unable to create new client')
    }
  }

  async findAll(): Promise<FindClientDto[]> {
    const clients = await this.prismaService.client.findMany({
      where: {
        role: { not: 'admin' }
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    return clients;
  }

  async findOne(id: string): Promise<FindClientDto> {
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

      if(!client) {
        throw new NotFoundException('client not found');
      }
      
      return client;

  }

  async delete(id: string) {
    const client = await this.prismaService.client.findUnique({
      where: { id },
    });

    if(!client) {
      throw new NotFoundException('client not found');  
    } 

    try {  
      await this.prismaService.client.delete({
        where: { id },
      })
    } catch (error) {
      throw new NotFoundException('client not found');
    }

  }

  async updateRole(id: string, role: string) {
    const client = await this.prismaService.client.findUnique({
      where: { id },
    });

    if(!client) {
      throw new NotFoundException('client not found');  
    } 

    try {
      await this.prismaService.client.update({
        where: { id },
        data: {
          role: {
            set: role,
          }
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
        }
      })
    } catch (error) {
      throw new NotFoundException('not update');
    }
  }
}
