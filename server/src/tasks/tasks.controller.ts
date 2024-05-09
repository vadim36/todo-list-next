import { Body, Controller, Delete, Get, Param, Post, Put, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import TaskModel from 'src/models/task.model';
import CreateTaskDto from './dto/create-task-dto';
import { TasksService } from './tasks.service';
import TaskParams from './dto/task-params';
import UpdateTaskDto from './dto/update-task-dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor (private tasksService: TasksService) {}

  @ApiOperation({summary: 'Create a new task'})
  @ApiResponse({status: 201, type: TaskModel})
  @UsePipes(ValidationPipe)
  @Post()
  async createTask(@Body() taskDto: CreateTaskDto):Promise<TaskModel> {
    return await this.tasksService.createTask(taskDto)
  }
  
  @ApiOperation({summary: 'Getting a user`s tasks'})
  @ApiResponse({status: 200, type: [TaskModel]})
  @Get('/:userId')
  async getAllTask(@Param('userId') userId: string):Promise<TaskModel[]> {
    return await this.tasksService.getAllTasks(userId)
  }
  
  @ApiOperation({summary: 'Getting a specific user`s task'})
  @ApiResponse({status: 200, type: TaskModel})
  @UsePipes(ValidationPipe)
  @Get('/:userId/:taskId')
  async getTask(@Param() params: TaskParams):Promise<TaskModel> {
    return await this.tasksService.getTask(params)
  }

  @ApiOperation({summary: 'Update a specific user`s task'})
  @ApiResponse({status: 201, type: TaskModel})
  @UsePipes(ValidationPipe)
  @Put()
  async updateTask(@Body() taskDto: UpdateTaskDto):Promise<TaskModel> {
    return await this.tasksService.updateTask(taskDto)
  }

  @ApiOperation({summary: 'Update a specific user`s task'})
  @ApiResponse({status: 201, type: TaskModel})
  @UsePipes(ValidationPipe)
  @Delete('/:userId/:taskId')
  async removeTask(@Param() params: TaskParams):Promise<TaskModel> {
    return await this.tasksService.removeTask(params)
  }
}