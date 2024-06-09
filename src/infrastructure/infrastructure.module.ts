import { Module } from '@nestjs/common';
import { BookController } from './http/api/controllers/book/book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './adapters/respository/books/schema/book.schema';
import { AuthController } from './http/api/controllers/auth/auth.controller';
import { UserSchema } from './adapters/respository/auth/schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';
import { AuthService } from 'src/domain/services/auth/auth.service';
import { BookService } from 'src/domain/services/book/book.service';
import { JwtStrategy } from './http/api/jwt/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory: (config: ConfigService) =>{
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES')
          },
        };
      },
    }),
    MongooseModule.forFeature([
      {
        name: 'Book',
        schema: BookSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [BookController, AuthController],
  providers: [BookService, AuthService, JwtStrategy],

  exports: [JwtStrategy, PassportModule]
})
export class InfrastructureModule {}
