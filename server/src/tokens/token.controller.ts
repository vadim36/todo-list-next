import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import UserPayload from "./user-payload";
import { TokensService } from "./tokens.service";

@ApiTags('Tokens')
@Controller('/tokens')
export default class TokenController {
  constructor (private tokensService: TokensService) {}

  @ApiOperation({summary: 'Validate a refresh token'})
  @ApiResponse({status: 200, type: UserPayload})
  @Get('/validate/:token')
  validateRefreshToken(@Param('token') token: string) {
    return this.tokensService.validateRefreshToken(token)
  }
}