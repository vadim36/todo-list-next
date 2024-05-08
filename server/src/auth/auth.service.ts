import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { TokensService } from 'src/tokens/tokens.service';
import CreateUserDto from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';
import SigninDto from './dto/signin-dto';

@Injectable()
export class AuthService {
  constructor (
    private usersService: UsersService,
    private tokenService: TokensService
  ) {}

  async signup(userDto: CreateUserDto) {
    const hashPassword = await hash(userDto.password, 4)
    const user = await this.usersService.createUser({...userDto, password: hashPassword})
    return await this.tokenService.generateTokens(user)
  }

  async signin(userDto: SigninDto) {
    const user = await this.usersService.getUserById(userDto.email)
    const isPasswordEqual = await compare(userDto.password, user.password)
    if (!user || !isPasswordEqual) {
      throw new HttpException('The user was not found', HttpStatus.BAD_REQUEST)
    }
    return await this.tokenService.generateTokens(user)
  }
}