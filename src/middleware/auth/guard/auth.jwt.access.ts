import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JWTAccessGuard extends AuthGuard('access') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }
    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        // switch(info) {
        //     case TokenExpiredError:
        // }
        /**
         * @todo 스위치 안에 타입 받아 넣고 인스턴스 비교해서 맞는에러 떤져주기
         */
        if (info instanceof TokenExpiredError) {
            throw new UnauthorizedException('Access authentication has expired.');
        } else if (info instanceof JsonWebTokenError) {
            throw new UnauthorizedException('Invalid authentication.');
        } else if (info instanceof NotBeforeError) {
            throw new UnauthorizedException('There is a problem with authentication.');
        }

        return super.handleRequest(err, user, info, context, status);
    }
}
