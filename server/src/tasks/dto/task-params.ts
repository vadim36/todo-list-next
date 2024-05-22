import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import TaskModel from "src/models/task.model";

export default class TaskParams implements Partial<TaskModel> {
  @ApiProperty({description: 'an user`s identifier', example: 'uuid'})
  @IsString({message: 'userId must be a string'})
  userId: string;
  @ApiProperty({description: 'an task`s identifier', example: 'uuid'})
  @IsString({message: 'taskId must be a string'})
  taskId: string;
}