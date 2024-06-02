import { Body, Controller, Get, Param, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateUserDto from 'src/users/dto/create-user-dto';
import { AuthService } from './auth.service';
import AuthDto from 'src/tokens/dto/auth-dto';
import SigninDto from './dto/sign-in-dto';
import RefreshDto from './dto/refresh-dto';
import type { Response } from 'express';
import UserDto from './dto/user-dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @ApiOperation({summary: 'Sign up a new user'})
  @ApiResponse({status: 201, type: AuthDto})
  @UsePipes(ValidationPipe)
  @Post('/signup')
  async signup(
    @Body() userDto: CreateUserDto,
    @Res({passthrough: true}) response: Response
  ):Promise<AuthDto> {
    const authData: AuthDto = await this.authService.signup(userDto)
    response.cookie('accessToken', authData.accessToken, {httpOnly: true})
    response.cookie('refreshToken', authData.refreshToken, {httpOnly: true})
    response.cookie('userId', authData.payload.userId, {httpOnly: true})
    return authData
  }

  @ApiOperation({summary: 'Sign in a user'})
  @ApiResponse({status: 201, type: AuthDto})
  @UsePipes(ValidationPipe)
  @Post('/signin')
  async signin(
    @Body() userDto: SigninDto,
    @Res({passthrough: true}) response: Response
  ):Promise<AuthDto> {
    const authData: AuthDto = await this.authService.signin(userDto)
    response.cookie('accessToken', authData.accessToken, {httpOnly: true})
    response.cookie('refreshToken', authData.refreshToken, {httpOnly: true})
    response.cookie('userId', authData.payload.userId, {httpOnly: true})
    return authData
  }

  @ApiOperation({summary: 'Refresh tokens'})
  @ApiResponse({status: 201})
  @UsePipes(ValidationPipe)
  @Post('/refresh')
  async refresh(
    @Body() tokenDto: RefreshDto,
    @Res({passthrough: true}) response: Response
  ):Promise<AuthDto | never> {
    const authData: AuthDto = await this.authService.refresh(tokenDto.refreshToken)
    response.cookie('accessToken', authData.accessToken, {httpOnly: true})
    response.cookie('refreshToken', authData.refreshToken, {httpOnly: true})
    return authData
  }

  @ApiOperation({summary: 'Log out a user'})
  @ApiResponse({status: 201})
  @Post('/logout')
  logout(@Res({passthrough: true}) response: Response) {
    response.clearCookie('accessToken')
    response.clearCookie('refreshToken')
    return 'ok'
  }

  @ApiOperation({summary: 'Validate an access token'})
  @ApiResponse({status: 200})
  @Get('/validate/:token')
  validateAccessToken(@Param('token') token: string):UserDto | false {
    return this.authService.validateAccessToken(token)
  }
}