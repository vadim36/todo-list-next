import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import TokensDto from 'src/tokens/dto/tokens-dto';
import CreateUserDto from 'src/users/dto/create-user-dto';
import type { Response } from 'express';
import SigninDto from './dto/signin-dto';
import LogoutDto from './dto/logout-dto';
import RefreshTokenDto from './dto/refresh-dto';

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
    response.cookie('refreshToken', tokens.refreshToken.tokenBody, { httpOnly: true })
    response.cookie('accessToken', tokens.accessToken, { httpOnly: true })
    return tokens
  }

  @ApiOperation({summary: 'Sign in a user'})
  @ApiResponse({status: 201, type: TokensDto})
  @UsePipes(ValidationPipe)
  @Post('/signin')
  async signin(
    @Body() userDto: SigninDto, 
    @Res({ passthrough: true}) response: Response
  ) {
    const tokens = await this.authService.signin(userDto)
    response.cookie('refreshToken', tokens.refreshToken.tokenBody, { httpOnly: true })
    response.cookie('accessToken', tokens.accessToken, { httpOnly: true })
    return tokens
  }

  @ApiOperation({summary: 'Log out a user'})
  @ApiResponse({status: 201})
  @UsePipes(ValidationPipe)
  @Post('/logout')
  async logout(
    @Body() userDto: LogoutDto,
    @Res({passthrough: true}) response: Response
  ):Promise<void> {
    response.clearCookie('refreshToken')
    response.clearCookie('accessToken')
    return await this.authService.logout(userDto.userId)
  }

  @ApiOperation({summary: 'Refresh an access token'})
  @ApiResponse({status: 201})
  @UsePipes(ValidationPipe)
  @Post('/refresh')
  async refresh(@Body() tokenDto: RefreshTokenDto) {
    return await this.authService.refresh(tokenDto.refreshToken)
  }
}