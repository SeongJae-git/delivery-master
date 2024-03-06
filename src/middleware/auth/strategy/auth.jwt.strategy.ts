import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/domain/user/repository/user.repository';

/**
 * @deprecated 더이상 사용 안함
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    return req?.cookies?.accessToken;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.AUTH_ACCESS_KEY
        });
    }

    async validate(payload: { email: string }) {
        const user = await this.userRepository.findUserByEmail(payload.email);

        if (!user) {
            throw new UnauthorizedException('There are no matching users.');
        }

        return user;
    }
}
