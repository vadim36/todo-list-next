import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";
import TaskModel from "src/models/task.model";

export default class CreateTaskDto implements Partial<TaskModel> {
  @ApiProperty({description: 'Post`s title', example: 'Title'})
  @IsString({message: 'title must be a string'})
  @Length(3, 48, {message: 'title must be longer than 3 and less and 48'})
  title: string;
  @ApiProperty({description: 'Post`s content', example: 'Content'})
  @IsString({message: 'content must be a string'})
  @Length(0, 512, {message: 'content must be less and 512'})
  @IsOptional()
  content?: string;
  @ApiProperty({description: 'Post`s author identifier', example: 'uuid'})
  @IsString({message: 'id must be a string'})
  userId: string;
}