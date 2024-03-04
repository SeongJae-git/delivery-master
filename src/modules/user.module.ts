import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from 'src/domain/user/controller/user.controller';
import { UserRepository } from 'src/domain/user/repository/user.repository';
import { UserEntity } from 'src/domain/user/repository/user.entity';
import { UserService } from 'src/domain/user/service/user.service';
import { AuthModule } from 'src/modules/auth.module';
import { RedisService } from 'src/middleware/redis/redis.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
    controllers: [UserController],
    providers: [UserService, UserRepository, RedisService]
})
export class UserModule {}
