import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import UserModel from "src/models/user.model";

export default class UserPayload implements Omit<UserModel, 'password'> {
  @ApiProperty({description: 'an identifier', example: 'uuid'})
  @IsString({message: 'id must be a string'})
  userId: string;
  @ApiProperty({description: 'a name', example: 'test'})
  @IsString({message: 'name must be a string'})
  @Length(3, 24, {message: 'name must be longer than 3 and less and 24'})
  name: string;
  @ApiProperty({description: 'an email', example: 'test@gmail.com'})
  @IsString({message: 'email must be a string'})
  @IsEmail({}, {message: 'email must be correct'})
  email: string;

  constructor (user: UserPayload | UserModel) {
    this.userId = user.userId
    this.name = user.name
    this.email = user.email
  }
}