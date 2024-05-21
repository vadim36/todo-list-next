import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [TokensService],
  exports: [TokensService],
  imports: [JwtModule]
})
export class TokensModule {}