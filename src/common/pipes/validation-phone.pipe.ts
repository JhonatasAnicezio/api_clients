import { ArgumentMetadata, Injectable, PipeTransform, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class ValidationPhone implements PipeTransform {
    transform(phone: string) {
        const regex = /^\d+$/;

        if(!phone || phone.length < 9 && regex.test(phone)) {
            throw new UnauthorizedException('format invalid');
        }

        return phone;
    }
}