import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength, minLength } from "class-validator";

export class SingUpDto {
    @IsNotEmpty()
    @IsString()
    readonly user_name: string;

    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter a correct email.'})
    readonly user_email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly user_password: string;
}