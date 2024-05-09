import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export default class TaskParams {
  @ApiProperty({description: 'an user`s identifier', example: 'uuid'})
  @IsString({message: 'userId must be a string'})
  userId: string;
  @ApiProperty({description: 'an task`s identifier', example: 'uuid'})
  @IsString({message: 'taskId must be a string'})
  taskId: string;
}