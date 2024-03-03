import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpUserDTO } from '../dto/signup.user.dto';
import { SignInUserDTO } from '../dto/signin.user.dto';
import { UserRepository } from '../repository/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
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
                { user_no: user.user_no },
                {
                    secret: process.env.AUTH_REFRESH_KEY,
                    expiresIn: process.env.AUTH_REFRESH_EXPIRATION_TIME
                }
            );

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

    async generateUserAccessToken(refreshToken: string) {
        const payload = await this.jwtService.verifyAsync(refreshToken, { secret: process.env.AUTH_REFRESH_KEY });
        const user = await this.userRepository.findUserByUserNo(payload.user_no);

        if (user) {
            return await this.jwtService.signAsync(
                { email: user.email },
                {
                    secret: process.env.AUTH_ACCESS_KEY,
                    expiresIn: process.env.AUTH_ACCESS_EXPIRATION_TIME
                }
            );
        } else {
            throw new UnauthorizedException('Invalid authentication.');
        }
    }
}
