import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DbModule } from 'src/db/db.module';
import { UsersModule } from 'src/users/users.module';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [DbModule, UsersModule, TokensModule]
})
export class TasksModule {}
