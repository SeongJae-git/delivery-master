import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async getRedis(key: string) {
        return await this.redis.get(key);
    }

    async setRedis(key: string, value: string) {
        await this.redis.set(key, value);
    }

    async deleteRedis(key: string) {
        await this.redis.del(key);
    }
}
