import { ApiProperty } from "@nestjs/swagger";
import UserModel from "src/models/user.model";

export default class CreateUserDto implements Partial<UserModel> {
  @ApiProperty({description: 'a name', example: 'test'})
  name: string;
  @ApiProperty({description: 'an email', example: 'test@gmail.com'})
  email: string;
  @ApiProperty({description: 'a password', example: 'test123'})
  password: string;
  @ApiProperty({description: 'a token', example: 'uuid'})
  refreshToken: string;
}