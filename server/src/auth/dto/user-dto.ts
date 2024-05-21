import { ApiProperty } from "@nestjs/swagger";
import UserModel from "src/models/user.model";

export default class UserDto implements Partial<UserModel> {
  @ApiProperty({description: 'an identifier', example: 'uuid'})
  userId: string;
  @ApiProperty({description: 'a name', example: 'test'})
  name: string;
  @ApiProperty({description: 'an email', example: 'test@gmail.com'})
  email: string;
}