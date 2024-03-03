import { Module } from '@nestjs/common';

import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { ConfigModule } from './modules/config.module';
import { TypeOrmModule } from './modules/typeorm.module';
import { RedisModule } from './modules/redis.module';

@Module({
    imports: [ConfigModule, TypeOrmModule, UserModule, AuthModule, RedisModule],
    controllers: [],
    providers: []
})
export class AppModule {}
