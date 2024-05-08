import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export default class RefreshTokenDto {
  @ApiProperty({description: 'an refresh token', example: 'uuid'})
  @IsString({message: 'token must be a string'})
  refreshToken: string;
}