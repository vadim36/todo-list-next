import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    DbModule,
    UsersModule,
    TokensModule,
    AuthModule,
    TasksModule
  ]
})
export default class AppModule {}