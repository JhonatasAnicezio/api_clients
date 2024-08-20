import { IsNumber, IsString } from "class-validator"

export class CreateClientDto {
    @IsString()
    name: string

    @IsString()
    email: string

    @IsNumber()
    phone: number

    @IsString()
    password: string
}
