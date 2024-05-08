import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    DbModule
  ]
})
export default class AppModule {}