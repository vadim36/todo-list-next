import { Injectable } from '@nestjs/common';
import CreateTaskDto from './dto/create-task-dto';
import TaskModel from 'src/models/task.model';
import { DbService } from 'src/db/db.service';
import { $Enums } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor (private DBService: DbService) {}

  async createTask(taskDto: CreateTaskDto):Promise<TaskModel> {
    return await this.DBService.task.create({
      data: {
        title: taskDto.title,
        content: taskDto.content ?? '',
        status: $Enums.Statuses.Todo,
        user: { connect: { userId: taskDto.userId}}
      }
    })
  }
}