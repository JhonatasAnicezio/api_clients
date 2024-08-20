import { IsEmail, IsNumber, IsString } from "class-validator"

export class CreateClientDto {
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    phone: string

    @IsString()
    password: string
}
