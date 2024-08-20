import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put, ValidationPipe } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { HashPasswordPipe } from 'src/common/pipes/hash-password.pipe';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';
import { FindClientDto } from './dto/find-client-dto';
import { RequestWhitClient } from 'src/interfaces/request-whit-client';
import { ClientGuard } from './client.guard';
import { ValidationPhone } from 'src/common/pipes/validation-phone.pipe';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}
  
  @Post()
  create(
    @Body(new ValidationPipe()) createClientDto: CreateClientDto,
    @Body('password', HashPasswordPipe) password: string,
    @Body('phone', ValidationPhone) phone: string,
  ) {
    return this.clientsService.create({
      ...createClientDto,
      phone,
      password,
    });
  }
  
  @Get()
  @UseGuards(AuthenticationGuard, ClientGuard)
  findAll(): Promise<FindClientDto[]> {
    return this.clientsService.findAll();
  }

  @Get('/me')
  @UseGuards(AuthenticationGuard)
  async findOne(@Req() request: RequestWhitClient): Promise<FindClientDto> {
    const { sub } = request.user;

    return await this.clientsService.findOne(sub);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, ClientGuard)
  delete(@Param('id') id: string) {
    return this.clientsService.delete(id);
  }

  @Put(':id')
  @UseGuards(AuthenticationGuard, ClientGuard)
  update(@Param('id') id: string, @Body('role') role: string) {
    return this.clientsService.updateRole(id, role);
  }
}
