import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import CreateTaskDto from './dto/create-task-dto';
import TaskModel from 'src/models/task.model';
import { DbService } from 'src/db/db.service';
import { $Enums } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import UpdateTaskDto from './dto/update-task-dto';
import TaskParams from './dto/task-params';

@Injectable()
export class TasksService {
  constructor (
    private DBService: DbService,
    private usersService: UsersService
  ) {}

  async createTask(taskDto: CreateTaskDto):Promise<TaskModel> {
    const user = await this.usersService.getUserById(taskDto.userId)
    
    return await this.DBService.task.create({
      data: {
        title: taskDto.title,
        content: taskDto.content ?? '',
        status: $Enums.Statuses.Todo,
        user: { connect: { userId: user.userId}}
      }
    })
  }

  async getAllTasks(userId: string):Promise<TaskModel[]> {
    const user = await this.usersService.getUserById(userId)
    return await this.DBService.task.findMany({
      where: { userId: user.userId }
    })
  }

  async getTask(params: TaskParams):Promise<TaskModel> {
    const user = await this.usersService.getUserById(params.userId)
    const task = await this.DBService.task.findUnique({
      where: { taskId: params.taskId, userId: user.userId}
    })
    
    return task ? task : null
  }

  async updateTask(taskDto: UpdateTaskDto):Promise<TaskModel> {
    const { taskId, userId, ...updatingData } = taskDto
    
    const task = await this.getTask({ taskId, userId })
    if (!task) {
      throw new HttpException('Such task was not found', HttpStatus.BAD_REQUEST)
    }

    return await this.DBService.task.update({
      where: { taskId }, data: {...updatingData}
    })
  }

  async removeTask(params: TaskParams):Promise<TaskModel> {
    const user = await this.usersService.getUserById(params.userId)
    const task = await this.DBService.task.delete(
      {where: { userId: user.userId, taskId: params.taskId }}
    )
    
    if (!task) {
      throw new HttpException('Such task was not found', HttpStatus.BAD_REQUEST)
    }

    return task
  }
} 