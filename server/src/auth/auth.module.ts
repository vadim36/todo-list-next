import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import {JwtModule} from '@nestjs/jwt'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [ 
    UsersModule,
    JwtModule.register({ secret: process.env.TOKEN_SIGNATURE })
  ],
})
export class AuthModule {}
