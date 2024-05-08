import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [DbModule]
})
export class TasksModule {}
