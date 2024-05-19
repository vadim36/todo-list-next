import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import UserPayload from './user-payload';
import UserModel from 'src/models/user.model';
import { JwtService } from '@nestjs/jwt';
import TokensDto from './dto/tokens-dto';
import { DbService } from 'src/db/db.service';
import RefreshTokenModel from 'src/models/token.model';

@Injectable()
export class TokensService {
  constructor (
    private jwtService: JwtService,
    private DBService: DbService
  ) {}

  async generateTokens(user: UserPayload | UserModel):Promise<TokensDto> {
    const payload = new UserPayload(user)

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({...payload}, {
        secret: process.env.ACCESS_TOKEN_SIGNATURE,
        expiresIn: '24h'
      }),
      this.jwtService.signAsync({...payload}, {
        secret: process.env.REFRESH_TOKEN_SIGNATURE,
        expiresIn: '30d'
      })
    ])

    const tokenFromDB = await this.DBService.refreshToken.create({
      data: { tokenBody: refreshToken, user: { connect: { userId: payload.userId }}}
    })

    return { accessToken, refreshToken: tokenFromDB }
  }

  async getRefreshToken(id: string):Promise<RefreshTokenModel> {
    return await this.DBService.refreshToken.findFirst({
      where: {OR: [{userId: id}, {tokenId: id}]}
    })
  }
  
  async removeToken(id:string):Promise<void> {
    const token = await this.DBService.refreshToken.deleteMany({
      where: {OR: [{userId: id}, {tokenId: id}]}
    })

    if (!token) throw new UnauthorizedException()
  }
}