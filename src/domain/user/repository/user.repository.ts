import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { SignUpUserDTO } from '../dto/signup.user.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async insertUser(signUpUserDTO: SignUpUserDTO): Promise<void> {
        const userEntity = this.userRepository.create(signUpUserDTO);

        this.userRepository.save(userEntity);
    }

    async findUserByUserNo(user_no: number) {
        return this.userRepository.findOne({
            where: { user_no: user_no }
        });
    }

    async findUserByEmail(email: string) {
        return this.userRepository.findOne({
            where: { email: email },
            select: ['user_no', 'email', 'name', 'password']
        });
    }

    async updateUser() {}

    async deleteUser() {}
}
