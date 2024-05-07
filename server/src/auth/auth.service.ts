import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import TokensDto from './dto/tokens-dto';
import CreateUserDto from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import UserModel from 'src/models/user.model';
import UserPayload from './user-payload';
import LoginDto from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async registration(userDto: CreateUserDto):Promise<TokensDto> {
    const hashPassword = await hash(userDto.password, 4)
    const user = await this.usersService.createUser({...userDto, password: hashPassword})
    const tokens = this.generateTokens(user)
    await this.usersService.updateUser({
      userId: user.userId, 
      refreshToken: tokens.refreshToken
    })

    return tokens
  }
  
  async login(userDto: LoginDto):Promise<TokensDto> {
    const user = await this.usersService.getUserById(userDto.email)
    const isPasswordEquals = await compare(userDto.password, user.password)
    if (!isPasswordEquals) {
      throw new HttpException('The passwords are not equal', HttpStatus.BAD_REQUEST)
    }
    
    const tokens = this.generateTokens(user)
    await this.usersService.updateUser({
      userId: user.userId, 
      refreshToken: tokens.refreshToken
    })

    return tokens
  }

  private generateTokens(model: UserModel):TokensDto {
    const payload = new UserPayload(model)
    return {
      accessToken: this.jwtService.sign({...payload}),
      refreshToken: this.jwtService.sign({...payload})
    }
  }
}