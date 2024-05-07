import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    UsersModule,
    DbModule
  ]
})
export default class AppModule {}