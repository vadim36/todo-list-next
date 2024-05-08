import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import UserModel from "src/models/user.model";

export default class LogoutDto implements Pick<UserModel, 'userId'> {
  @ApiProperty({description: 'an identifier', example: 'uuid'})
  @IsString({message: 'id must be a string'})
  userId: string;
}