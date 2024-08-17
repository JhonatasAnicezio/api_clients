import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { HashPasswordPipe } from 'src/common/pipes/hash-password.pipe';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}
  
  @Post()
  create(
    @Body() createClientDto: CreateClientDto,
    @Body('password', HashPasswordPipe) password: string,
  ) {
    return this.clientsService.create({
      ...createClientDto,
      password,
    });
  }
  
  @Get()
  @UseGuards(AuthenticationGuard)
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthenticationGuard)
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }
}
