import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import TaskModel from 'src/models/task.model';
import CreateTaskDto from './dto/create-task-dto';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor (private tasksService: TasksService) {}

  @ApiOperation({summary: 'Create a new task'})
  @ApiResponse({status: 201, type: TaskModel})
  @UsePipes(ValidationPipe)
  @Post()
  async createTask(@Body() taskDto: CreateTaskDto) {
    return await this.tasksService.createTask(taskDto)
  }
  
  async getTask() {}
  async getAllTask() {}
  async updateTask() {}
  async removeTask() {}
}