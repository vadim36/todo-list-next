import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    DbModule,
    UsersModule
  ]
})
export default class AppModule {}