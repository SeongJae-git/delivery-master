import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpUserDTO } from '../dto/signup.user.dto';
import { SignInUserDTO } from '../dto/signin.user.dto';
import { UserRepository } from '../repository/user.repository';
import { RedisService } from 'src/middleware/redis/redis.service';
import { AuthService } from 'src/middleware/auth/service/auth.service';
import { CommonUtil } from 'src/utils/common/common.util';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService,
        private readonly redisService: RedisService
    ) {}

    async signUpUser(signUpUserDTO: SignUpUserDTO) {
        const user = await this.userRepository.findUserByEmail(signUpUserDTO.email);

        if (!user) {
            const signUpDataSet = Object.assign({
                ...signUpUserDTO,
                password: await CommonUtil.generateHash(signUpUserDTO.password)
            });

            await this.userRepository.insertUser(signUpDataSet);
        } else {
            throw new UnauthorizedException(`${signUpUserDTO.email} is already exist.`);
        }
    }

    async signInUser(signInUserDTO: SignInUserDTO) {
        const user = await this.userRepository.findUserByEmail(signInUserDTO.email);

        if (!user || !(await CommonUtil.compareHash(signInUserDTO.password, user.password))) {
            throw new UnauthorizedException(`Account doesn't exist.`);
        }

        const accessToken = await this.authService.generateAccessToken({ email: user.email });
        const refreshToken = await this.authService.generateRefreshToken({
            user_no: user.user_no,
            email: user.email
        });

        this.redisService.setRedis(user.user_no.toString(), refreshToken, process.env.AUTH_REFRESH_EXPIRATION_TIME);

        return {
            email: user.email,
            name: user.name,
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    }

    async reissueToken(refreshToken: string) {
        const payload = await this.authService.verifyRefreshToken(refreshToken);
        const redisRefreshToken = await this.redisService.getRedis(payload.user_no);

        if (!redisRefreshToken || refreshToken !== redisRefreshToken) {
            this.redisService.deleteRedis(payload.user_no);
            throw new UnauthorizedException('Invalid authentication. Please log in again.');
        }

        const newAccessToken = await this.authService.generateAccessToken({ email: payload.email });
        const newRefreshToken = await this.authService.generateRefreshToken({
            user_no: payload.user_no,
            email: payload.email
        });

        this.redisService.setRedis(payload.user_no, newRefreshToken, process.env.AUTH_REFRESH_EXPIRATION_TIME);

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }
}
