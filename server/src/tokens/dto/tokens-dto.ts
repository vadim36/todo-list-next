import { ApiProperty } from "@nestjs/swagger";
import RefreshTokenModel from "src/models/token.model";
import UserPayload from "../user-payload";

export default class TokensDto {
  @ApiProperty({description: 'an access token', example: 'uuid'})
  accessToken: string;
  @ApiProperty({description: 'an refresh token', example: 'uuid'})
  refreshToken: RefreshTokenModel;
  @ApiProperty({description: 'an user payload', example: {}})
  user: UserPayload
}