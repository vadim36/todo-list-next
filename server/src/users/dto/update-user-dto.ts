import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";
import UserModel from "src/models/user.model";

export default class UpdateUserDto implements Partial<UserModel> {
  @ApiProperty({description: 'an identifier', example: 'uuid'})
  @IsString({message: 'id must be a string'})
  userId: string;
  @ApiProperty({description: 'a name', example: 'test'})
  @IsString({message: 'name must be a string'})
  @Length(3, 24, {message: 'name must be longer than 3 and less and 24'})
  @IsOptional()
  name?: string;
  @ApiProperty({description: 'an email', example: 'test@gmail.com'})
  @IsString({message: 'email must be a string'})
  @IsEmail({}, {message: 'email must be correct'})
  @IsOptional()
  email?: string;
  @ApiProperty({description: 'a password', example: 'test123'})
  @IsString({message: 'password must be a string'})
  @Length(3, 24, {message: 'password must be longer than 3 and less and 24'})
  @IsOptional()
  password?: string;
  @ApiProperty({description: 'a token', example: 'uuid'})
  @IsString({message: 'token must be a string'})
  @IsOptional()
  refreshToken: string;
}