import { IsEmail, IsNumber, IsString } from "class-validator"

export class CreateClientDto {
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsNumber()
    phone: number

    @IsString()
    password: string
}
