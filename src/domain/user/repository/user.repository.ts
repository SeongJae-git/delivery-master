import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { SignUpUserDTO } from '../dto/signup.user.dto';
import { SignInUserDTO } from '../dto/signin.user.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async insertUser(signUpUserDTO: SignUpUserDTO): Promise<void> {
        await this.userRepository.insert(signUpUserDTO);
    }

    async findUserByUserNo(user_no: number) {
        return await this.userRepository.findOne({
            where: { user_no: user_no }
        });
    }

    async findUserByEmail(email: string) {
        return await this.userRepository.findOne({
            where: { email: email }
        });
    }

    async findUserByLogin(signInUserDTO: SignInUserDTO) {
        const user = await this.userRepository.findOne({
            where: {
                email: signInUserDTO.email,
                password: signInUserDTO.password
            }
        });

        return user;
    }
}
