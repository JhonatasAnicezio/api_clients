import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
    constructor(private configService: ConfigService) {}

    async transform(password: string): Promise<String> {
        const secret = this.configService.get<string>('SECRET');

        const passwordHash = await bcrypt.hash(password, secret);

        return passwordHash;
    }
}