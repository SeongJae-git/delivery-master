import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { RedisService } from 'src/middleware/redis/redis.service';

/**
 * @deprecated 더이상 사용안함
 */
@Injectable()
export class JWTGuard extends AuthGuard('jwt') {
    constructor(
        private readonly authService: AuthService,
        private readonly redisService: RedisService
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const accessTokenValid = await this.authService.verifyAccessToken(request.cookies['accessToken']);

        // 액세스 토큰이 유효하면 통과
        if (accessTokenValid) {
            return true;
        }

        // 만약 아니라면 리프레쉬 가지고 검사
        const refreshTokenValid = await this.authService.verifyRefreshToken(request.cookies['refreshToken']);

        // 리프레시 토큰 유효하지 않으면 튕김
        if (!refreshTokenValid) {
            return false;
        }

        // 들어온 리프레시 토큰 자체는 유효하니 레디스꺼 꺼내옴
        const redisRefreshToken = await this.redisService.getRedis(refreshTokenValid.user_no);

        // 레디스에 들어있는 리프레시랑 클라이언트 리프레시랑 검사
        if (!redisRefreshToken || redisRefreshToken !== request.cookies['refreshToken']) {
            return false;
        }

        // 레디스 토큰이랑 일치할 때 액세스 재발급+리프레시 재발급
        const newAccessToken = await this.authService.generateAccessToken({ email: refreshTokenValid.email });
        const newRefreshToken = await this.authService.generateRefreshToken({
            user_no: refreshTokenValid.user_no,
            email: refreshTokenValid.email
        });

        // 레디스 리프레시도 새로 교체
        this.redisService.setRedis(
            refreshTokenValid.user_no,
            newRefreshToken,
            process.env.AUTH_REFRESH_EXPIRATION_TIME
        );

        // 쿠키에 새로운 토큰들 설정
        request.res.cookie('accessToken', newAccessToken, { httpOnly: true, sameSite: 'none' });
        request.res.cookie('refreshToken', newRefreshToken, { httpOnly: true, sameSite: 'none' });

        return true;
    }
}
