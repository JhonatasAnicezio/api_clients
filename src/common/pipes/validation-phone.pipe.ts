import { ArgumentMetadata, Injectable, PipeTransform, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class ValidationPhone implements PipeTransform {
    transform(phone: number) {
        const convert = phone.toString();

        if(convert.length > 9) {
            throw new UnauthorizedException('format invalid');
        }

        return phone;
    }
}