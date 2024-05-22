import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import TaskModel from 'src/models/task.model';
import { UsersService } from 'src/users/users.service';
import CreateTaskDto from './dto/create-task-dto';
import TaskParams from './dto/task-params';
import UpdateTaskDto from './dto/update-task-dto';

@Injectable()
export class TasksService {
  constructor (
    private DBService: DbService,
    private usersService: UsersService
  ) {}

  async createTask(taskDto: CreateTaskDto):Promise<TaskModel> {
    const user = await this.usersService.getUserById(taskDto.userId)
    if (!user) throw new UnauthorizedException()
    return await this.DBService.task.create({
      data: {
        name: taskDto.name,
        body: taskDto.body ?? '',
        status: $Enums.Statuses.Todo,
        user: { connect: { userId: user.userId}}
      }
    })
  }

  async getAllTasks(userId: string):Promise<TaskModel[]> {
    const user = await this.usersService.getUserById(userId)
    if (!user) throw new UnauthorizedException() 
    return await this.DBService.task.findMany({
      where: { userId: user.userId }
    })
  }

  async getTask(params: TaskParams):Promise<TaskModel> {
    const user = await this.usersService.getUserById(params.userId)
    if (!user) new UnauthorizedException()
    return await this.DBService.task.findUnique({
      where: {...params}
    })
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
    if (!user) throw new UnauthorizedException()
    const task = await this.DBService.task.delete(
      {where: { userId: user.userId, taskId: params.taskId }}
    )
    
    if (!task) {
      throw new HttpException('Such task was not found', HttpStatus.BAD_REQUEST)
    }

    return task
  }

  async removeTasks(userId: string) {
    const user = await this.usersService.getUserById(userId)
    if (!user) throw new UnauthorizedException()
    const tasks = await this.DBService.task.deleteMany(
      {where: { userId: user.userId }}
    )
    
    if (!tasks) throw new UnauthorizedException()
    return 'ok'
  }
}