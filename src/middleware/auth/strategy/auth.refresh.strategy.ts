import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/domain/user/repository/user.repository';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor(private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    return req?.cookies?.refreshToken;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.AUTH_REFRESH_KEY
        });
    }

    async validate(payload: { user_no: number }) {
        const user = await this.userRepository.findUserByUserNo(payload.user_no);

        if (!user) {
            throw new UnauthorizedException('There are no matching users.');
        }

        return user;
    }
}
