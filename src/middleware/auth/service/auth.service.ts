import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async generateAccessToken(payload: { email: string }): Promise<string> {
        return this.jwtService.signAsync(
            { email: payload.email },
            {
                secret: process.env.AUTH_ACCESS_KEY,
                expiresIn: process.env.AUTH_ACCESS_EXPIRATION_TIME
            }
        );
    }

    async generateRefreshToken(payload: { user_no: string | number; email: string }): Promise<string> {
        return this.jwtService.signAsync(
            { user_no: payload.user_no, email: payload.email },
            {
                secret: process.env.AUTH_REFRESH_KEY,
                expiresIn: process.env.AUTH_REFRESH_EXPIRATION_TIME
            }
        );
    }

    async verifyAccessToken(accessToken: string): Promise<{ email: string }> {
        // assert
        /**
         * @todo 토큰 값 검증 assert
         */
        return this.jwtService.verify(accessToken, {
            secret: process.env.AUTH_ACCESS_KEY
        });
    }

    async verifyRefreshToken(refreshToken: string): Promise<{ user_no: string; email: string }> {
        return this.jwtService.verify(refreshToken, {
            secret: process.env.AUTH_REFRESH_KEY
        });
    }
}
