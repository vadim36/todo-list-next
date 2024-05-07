import { User } from "@prisma/client";
import TaskModel from "./task.model";
import { ApiProperty } from "@nestjs/swagger";

export default class UserModel implements User {
  @ApiProperty({description: 'an identifier', example: 'uuid'})
  userId: string;
  @ApiProperty({description: 'a name', example: 'test'})
  name: string;
  @ApiProperty({description: 'an email', example: 'test@gmail.com'})
  email: string;
  @ApiProperty({description: 'a password', example: 'test123'})
  password: string;
  @ApiProperty({description: 'a refresh token', example: 'uuid'})
  refreshToken: string;
  @ApiProperty({description: 'a list of user`s tasks', example: []})
  tasks: TaskModel[];
}