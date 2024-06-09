import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from 'src/application/dtos/auth/login.dto';
import { SingUpDto } from 'src/application/dtos/auth/singUp.dto';
import { AuthService } from 'src/domain/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    signUp(@Body() signUpDto: SingUpDto): Promise<{ token: string}>{
        return this.authService.singUp(signUpDto);
    }

    @Get('/login')
    login(@Body() loginDto: LoginDto): Promise<{ token: string}>{
        return this.authService.login(loginDto);
    }

}
