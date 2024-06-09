import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/infrastructure/adapters/respository/auth/schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SingUpDto } from 'src/application/dtos/auth/singUp.dto';
import { LoginDto } from 'src/application/dtos/auth/login.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async singUp(singUpDto: SingUpDto): Promise<{ token: string }> {
    const { user_name, user_email, user_password } = singUpDto;

    const hasshedPassword = await bcrypt.hash(user_password, 10);

    const user = await this.userModel.create({
      user_name,
      user_email,
      user_password: hasshedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { user_email, user_password } = loginDto;

    const user = await this.userModel.findOne({ user_email })

    if(!user){
        throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(user_password, user.user_password);
    
    if(!isPasswordMatched){
        throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}
