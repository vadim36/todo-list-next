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
        secret: process.env.ACCESS_TOKEN_SIGNATURE
      }),
      this.jwtService.signAsync({...payload}, {
        secret: process.env.REFRESH_TOKEN_SIGNATURE
      })
    ])

    const tokenFromDB = await this.refreshToken(payload.userId, refreshToken)

    return { accessToken, refreshToken: tokenFromDB }
  }

  async getRefreshToken(id: string):Promise<RefreshTokenModel> {
    const token = await this.DBService.refreshToken.findFirst({
      where: {OR: [{userId: id}, {tokenId: id}]}
    })

    return token ? token : null
  }
  
  async removeToken(id:string):Promise<void> {
    const token = await this.DBService.refreshToken.deleteMany({
      where: {OR: [{userId: id}, {tokenId: id}]}
    })

    if (!token) throw new UnauthorizedException()
  }

  private async refreshToken(userId: string, token: string) {
    let tokenFromDB = await this.getRefreshToken(userId)
    if (!tokenFromDB) {
      return tokenFromDB = await this.DBService.refreshToken.create({
        data: { tokenBody: token, user: { connect: { userId: userId }}}
      })
    }

    return tokenFromDB = await this.DBService.refreshToken.update({
      where: { userId },
      data: { tokenBody: token }
    })
  }
}