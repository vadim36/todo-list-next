import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import CreateUserDto from 'src/users/dto/create-user-dto';
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service';
import AuthDto from 'src/tokens/dto/auth-dto';
import { TokensService } from 'src/tokens/tokens.service';
import SigninDto from './dto/sign-in-dto';
import UserDto from './dto/user-dto';

@Injectable()
export class AuthService {
  constructor (
    private usersService: UsersService,
    private tokensService: TokensService
  ) {}

  async signup(userDto: CreateUserDto):Promise<AuthDto> {
    const hashPassword = await bcrypt.hash(userDto.password, 4)
    const user = await this.usersService.createUser({...userDto, password: hashPassword})
    return await this.tokensService.generateTokens(user)
  }

  async signin(userDto: SigninDto):Promise<AuthDto> {
    const user = await this.usersService.getUserById(userDto.email)
    const isPasswordEqual = await bcrypt.compare(userDto.password, user.password)
    if (!user) {
      throw new HttpException('The user was not found', HttpStatus.BAD_REQUEST)
    }
    
    if (!isPasswordEqual) {
      throw new HttpException('The wrong password', HttpStatus.BAD_REQUEST)
    }

    return await this.tokensService.generateTokens(user)
  }

  async refresh(token: string):Promise<AuthDto | never> {
    const payload: UserDto | false = this.tokensService.validateRefreshToken(token)
    if (!payload) throw new UnauthorizedException()
    const user = await this.usersService.getUserById(payload.userId)
    return await this.tokensService.generateTokens(user)
  }

  validateAccessToken(token: string):UserDto | false {
    return this.tokensService.validateAccessToken(token)
  }
}