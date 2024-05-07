import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import TokensDto from './dto/tokens-dto';
import { AuthService } from './auth.service';
import CreateUserDto from 'src/users/dto/create-user-dto';
import LoginDto from './dto/login-dto';

@ApiTags('Authtorization')
@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @ApiOperation({summary: 'Registration a new user'})
  @ApiResponse({status: 201, type: TokensDto})
  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto):Promise<TokensDto> {
    return await this.authService.registration(userDto)
  }

  @ApiOperation({summary: 'Log in account'})
  @ApiResponse({status: 200, type: TokensDto})
  @Post('/login')
  async login(@Body() userDto: LoginDto):Promise<TokensDto> {
    return await this.authService.login(userDto)
  }
}