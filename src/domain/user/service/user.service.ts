import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpUserDTO } from '../dto/signup.user.dto';
import { SignInUserDTO } from '../dto/signin.user.dto';
import { UserRepository } from '../repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/middleware/redis/redis.service';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService
    ) {}

    async signUpUser(signUpUserDTO: SignUpUserDTO) {
        if (!(await this.userRepository.findUserByEmail(signUpUserDTO.email))) {
            await this.userRepository.insertUser(signUpUserDTO);
        } else {
            throw new UnauthorizedException(`${signUpUserDTO.email} is already exist.`);
        }
    }

    async signInUser(signInUserDTO: SignInUserDTO) {
        const user = await this.userRepository.findUserByLogin(signInUserDTO);

        if (user) {
            const accessToken = await this.jwtService.signAsync(
                { email: user.email },
                {
                    secret: process.env.AUTH_ACCESS_KEY,
                    expiresIn: process.env.AUTH_ACCESS_EXPIRATION_TIME
                }
            );
            const refreshToken = await this.jwtService.signAsync(
                { user_no: user.user_no, email: user.email },
                {
                    secret: process.env.AUTH_REFRESH_KEY,
                    expiresIn: process.env.AUTH_REFRESH_EXPIRATION_TIME
                }
            );

            this.redisService.setRedis(user.user_no.toString(), refreshToken);

            return {
                email: user.email,
                name: user.name,
                accessToken: accessToken,
                refreshToken: refreshToken
            };
        } else {
            throw new UnauthorizedException(`Account doesn't exist.`);
        }
    }

    async reissueToken(refreshToken: string) {
        const payload = await this.jwtService.verifyAsync(refreshToken, { secret: process.env.AUTH_REFRESH_KEY });
        const redisRefreshToken = await this.redisService.getRedis(payload.user_no);

        if (!redisRefreshToken || refreshToken !== redisRefreshToken) {
            this.redisService.deleteRedis(payload.user_no);
            throw new UnauthorizedException('Invalid authentication. Please log in again.');
        }

        const newAccessToken = await this.jwtService.signAsync(
            { email: payload.email },
            {
                secret: process.env.AUTH_ACCESS_KEY,
                expiresIn: process.env.AUTH_ACCESS_EXPIRATION_TIME
            }
        );
        const newRefreshToken = await this.jwtService.signAsync(
            { user_no: payload.user_no, email: payload.email },
            {
                secret: process.env.AUTH_REFRESH_KEY,
                expiresIn: process.env.AUTH_REFRESH_EXPIRATION_TIME
            }
        );

        this.redisService.setRedis(payload.user_no, newRefreshToken);

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }
}
