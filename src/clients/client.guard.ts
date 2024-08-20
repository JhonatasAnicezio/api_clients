import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { RequestWhitClient } from 'src/interfaces/request-whit-client';

@Injectable()
export class ClientGuard implements CanActivate {
    constructor(private prismaService: PrismaService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: RequestWhitClient = context.switchToHttp().getRequest();
        const { sub } = request.user;

        if (!sub) {
            throw new UnauthorizedException('Not authentication');
        }

        const client = await this.prismaService.client.findUnique({
            where: { id: sub },
            select: { role: true }
        });

        if(client?.role !== 'admin') {
            return false;
        }

        return true;
    }
}
