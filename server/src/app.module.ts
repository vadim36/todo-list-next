import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    UsersModule,
    DbModule,
    AuthModule
  ]
})
export default class AppModule {}