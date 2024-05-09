import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { IsEnum, IsOptional, IsString, Length } from "class-validator";
import TaskModel from "src/models/task.model";

export default class UpdateTaskDto implements Partial<TaskModel> {
  @ApiProperty({description: 'an user`s identifier', example: 'uuid'})
  @IsString({message: 'userId must be a string'})
  userId: string;
  @ApiProperty({description: 'an task`s identifier', example: 'uuid'})
  @IsString({message: 'taskId must be a string'})
  taskId: string;
  @ApiProperty({description: 'Task`s title', example: 'Title'})
  @IsString({message: 'title must be a string'})
  @Length(3, 48, {message: 'title must be longer than 3 and less and 48'})
  @IsOptional()
  title?: string;
  @ApiProperty({description: 'Task`s status', example: $Enums.Statuses.InProgress})
  @IsEnum($Enums.Statuses)
  @IsOptional()
  status?: $Enums.Statuses;
  @ApiProperty({description: 'Task`s content', example: 'Content'})
  @IsString({message: 'content must be a string'})
  @Length(0, 512, {message: 'content must be less and 512'})
  @IsOptional()
  content?: string;
}