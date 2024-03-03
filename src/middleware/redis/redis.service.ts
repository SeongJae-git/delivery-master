import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async findTokenByEmail() {
        await this.redis.get('k1');
        await this.redis.set('k2', 'v2');
        await this.redis.del('k1');
    }
}
