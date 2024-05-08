import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { TokensService } from 'src/tokens/tokens.service';
import CreateUserDto from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';
import SigninDto from './dto/signin-dto';
import TokensDto from 'src/tokens/dto/tokens-dto';
import UserPayload from 'src/tokens/user-payload';

@Injectable()
export class AuthService {
  constructor (
    private usersService: UsersService,
    private tokenService: TokensService
  ) {}

  async signup(userDto: CreateUserDto):Promise<TokensDto> {
    const hashPassword = await hash(userDto.password, 4)
    const user = await this.usersService.createUser({...userDto, password: hashPassword})
    return await this.tokenService.generateTokens(user)
  }

  async signin(userDto: SigninDto):Promise<TokensDto> {
    const user = await this.usersService.getUserById(userDto.email)
    const isPasswordEqual = await compare(userDto.password, user.password)
    if (!user || !isPasswordEqual) {
      throw new HttpException('The user was not found', HttpStatus.BAD_REQUEST)
    }
    return await this.tokenService.generateTokens(user)
  }

  async logout(id: string):Promise<void> {
    await this.tokenService.removeToken(id)
  }

  async refresh(token: string):Promise<TokensDto> {
    const userPayload: UserPayload = this.tokenService.validateRefreshToken(token)
    const tokenFromDB = this.tokenService.getRefreshToken(token)
    
    if (!tokenFromDB) throw new UnauthorizedException()
    const refreshToken = await this.tokenService.refreshToken(userPayload.userId, token)
    const accessToken = (await this.tokenService.generateTokens(userPayload)).accessToken
  
    return { accessToken, refreshToken, user: {
      userId: userPayload.userId,
      name: userPayload.name,
      email: userPayload.email
    }}
  }
}