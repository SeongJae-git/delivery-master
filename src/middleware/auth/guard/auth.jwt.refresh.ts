import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('refresh') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }
    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if (info instanceof TokenExpiredError) {
            throw new UnauthorizedException('Authentication has expired. Please log in again.');
        } else if (info instanceof JsonWebTokenError) {
            throw new UnauthorizedException('Invalid authentication. Please log in again.');
        } else if (info instanceof NotBeforeError) {
            throw new UnauthorizedException('There is a problem with authentication. Please log in again.');
        }
        return super.handleRequest(err, user, info, context, status);
    }
}
