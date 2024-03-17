import { Injectable, NotFoundException } from '@nestjs/common';
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

    async updateAfterOrderByUserNo(user_no: number, count: number, point: number) {
        const userEntity = await this.userRepository.findOne({
            where: {user_no: user_no}
        });
        
        if(!userEntity) {
            throw new NotFoundException('User not found!');
        }
        // user 테이블 해당 유저의 주문횟수 +n
        userEntity.order_count += count;

        // user 테이블 해당 유저의 포인트 +n
        userEntity.point += point;

        // 저장
        this.userRepository.save(userEntity);
    }

    async updateUser() {}

    async deleteUser() {}
}
