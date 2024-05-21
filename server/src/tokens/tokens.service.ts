import { Injectable } from '@nestjs/common';
import UserPayload from './user-payload';
import UserModel from 'src/models/user.model';
import { JwtService } from '@nestjs/jwt';
import AuthDto from './dto/auth-dto';
import UserDto from 'src/auth/dto/user-dto';

@Injectable()
export class TokensService {
  constructor (private jwtService: JwtService) {}
  
  async generateTokens(model: UserPayload | UserModel):Promise<AuthDto> {
    const payload = new UserPayload(model)

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({...payload}, {
        secret: process.env.ACCESS_TOKEN_SIGNATURE,
        expiresIn: '1h'
      }),
      this.jwtService.signAsync({...payload}, {
        secret: process.env.REFRESH_TOKEN_SIGNATURE,
        expiresIn: '30d'
      })
    ])

    return { accessToken, refreshToken, payload: {...payload} }
  }

  validateAccessToken(token: string):boolean {
    try {
      this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_SIGNATURE
      })

      return true
    } catch {
      return false
    }
  }

  validateRefreshToken(token: string):false | UserDto {
    try {
      return this.jwtService.verify<UserDto>(token, {
        secret: process.env.REFRESH_TOKEN_SIGNATURE
      })
    } catch {
      return false
    }
  }
}