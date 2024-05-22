import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";
import TaskModel from "src/models/task.model";

export default class CreateTaskDto implements Partial<TaskModel> {
  @ApiProperty({description: 'a task name', example: 'test'})
  @IsString({message: 'name must be a string'})
  @Length(3, 48, {message: 'name must be longer than 3 and less and 48'})
  name: string;
  @ApiProperty({description: 'Task`s body', example: 'text....'})
  @IsString({message: 'content must be a string'})
  @Length(0, 512, {message: 'content must be less and 512'})
  @IsOptional()
  body?: string;
  @ApiProperty({description: 'Task`s author identifier', example: 'uuid'})
  @IsString({message: 'id must be a string'})
  userId: string;
}