import { ApiProperty } from "@nestjs/swagger"

export default class TokensDto {
  @ApiProperty({description: 'a refresh token', example: 'uuid'})
  refreshToken: string
  @ApiProperty({description: 'a access token', example: 'uuid'})
  accessToken: string
}