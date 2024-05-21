import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateUserDto from 'src/users/dto/create-user-dto';
import { AuthService } from './auth.service';
import AuthDto from 'src/tokens/dto/auth-dto';
import SigninDto from './dto/sign-in-dto';
import RefreshDto from './dto/refresh-dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @ApiOperation({summary: 'Sign up a new user'})
  @ApiResponse({status: 201, type: AuthDto})
  @UsePipes(ValidationPipe)
  @Post('/signup')
  async signup(@Body() userDto: CreateUserDto):Promise<AuthDto> {
    return await this.authService.signup(userDto)
  }

  @ApiOperation({summary: 'Sign in a user'})
  @ApiResponse({status: 201, type: AuthDto})
  @UsePipes(ValidationPipe)
  @Post('/signin')
  async signin(@Body() userDto: SigninDto):Promise<AuthDto> {
    return await this.authService.signin(userDto)
  }

  @ApiOperation({summary: 'Refresh tokens'})
  @ApiResponse({status: 201})
  @UsePipes(ValidationPipe)
  @Post('/refresh')
  async refresh(@Body() tokenDto: RefreshDto):Promise<AuthDto | never> {
    return await this.authService.refresh(tokenDto.refreshToken)
  }
}