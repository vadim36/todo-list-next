import { CanActivate, ExecutionContext, Inject, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { TokensService } from "src/tokens/tokens.service";

export class AuthGuard implements CanActivate {
  constructor (@Inject(TokensService) private tokensService: TokensService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    try {
      const authHeader: string = request.headers.authorization
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]

      if (bearer !== 'Bearer' || !token) throw new UnauthorizedException()

      const user = this.tokensService.validateAccessToken(token)
      if (!user) throw new UnauthorizedException()

      request.user = user
      return true
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
  
}