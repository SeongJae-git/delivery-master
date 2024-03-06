import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async getRedis(key: string) {
        return this.redis.get(key);
    }

    async setRedis(key: string, value: string, expire: string) {
        this.redis.set(key, value, 'EX', parseInt(expire, 10));
    }

    async deleteRedis(key: string) {
        this.redis.del(key);
    }
}
