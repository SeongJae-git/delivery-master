import { Module } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@liaoliaots/nestjs-redis';

@Module({
    imports: [
        NestRedisModule.forRoot({
            readyLog: true,
            config: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT, 10),
                password: process.env.REDIS_PASSWORD
            }
        }),
    ],
    exports: [RedisModule]
})
export class RedisModule {}
