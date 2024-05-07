import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import UserModel from "src/models/user.model";

export default class CreateUserDto implements Partial<UserModel> {
  @ApiProperty({description: 'a name', example: 'test'})
  @IsString({message: 'name must be a string'})
  @Length(3, 24, {message: 'name must be longer than 3 and less and 24'})
  name: string;
  @ApiProperty({description: 'an email', example: 'test@gmail.com'})
  @IsString({message: 'email must be a string'})
  @IsEmail({}, {message: 'email must be correct'})
  email: string;
  @ApiProperty({description: 'a password', example: 'test123'})
  @IsString({message: 'password must be a string'})
  @Length(3, 24, {message: 'password must be longer than 3 and less and 24'})
  password: string;
}