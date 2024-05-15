import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from 'src/db/db.module';
import TokenController from './token.controller';

@Module({
  providers: [TokensService],
  controllers: [TokenController],
  imports: [JwtModule, DbModule],
  exports: [TokensService]
})
export class TokensModule {}