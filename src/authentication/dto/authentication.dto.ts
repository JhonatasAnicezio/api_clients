import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthenticationDto {
    @IsEmail(undefined, { message: 'email invalid' })
    email: string;

    @IsNotEmpty({ message: 'password invalid' })
    password: string;
}
