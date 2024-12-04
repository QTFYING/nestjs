import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    if (!authorization) throw new Error('未登录');

    try {
      const token = authorization.split(' ')[1];
      const data = this.jwtService.verify(token);
      return !!data;
    } catch {
      throw new UnauthorizedException('token失效');
    }
  }
}