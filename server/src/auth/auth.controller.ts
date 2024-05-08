import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import TokensDto from 'src/tokens/dto/tokens-dto';
import CreateUserDto from 'src/users/dto/create-user-dto';
import type { Response } from 'express';
import SigninDto from './dto/signin-dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @ApiOperation({summary: 'Sign up a new user'})
  @ApiResponse({status: 201, type: TokensDto})
  @UsePipes(ValidationPipe)
  @Post('/signup')
  async signup(
    @Body() userDto: CreateUserDto, 
    @Res({ passthrough: true}) response: Response
  ) {
    const tokens = await this.authService.signup(userDto)
    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true })
    return tokens
  }

  @ApiOperation({summary: 'Sign in a user'})
  @ApiResponse({status: 201, type: TokensDto})
  @Post('/signin')
  async signin(
    @Body() userDto: SigninDto, 
    @Res({ passthrough: true}) response: Response
  ) {
    const tokens = await this.authService.signin(userDto)
    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true })
    return tokens
  }

  async logout() {}
  async refresh() {}
}