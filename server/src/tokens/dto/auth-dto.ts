import UserDto from "src/auth/dto/user-dto";
import TokensDto from "./tokens-dto";
import { ApiProperty } from "@nestjs/swagger";

export default class AuthDto extends TokensDto {
  @ApiProperty({description: 'user payload', example: {}})
  payload: UserDto
}