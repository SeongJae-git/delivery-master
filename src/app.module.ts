import { Module } from '@nestjs/common';

import { UserModule } from './modules/domain/domain.user.module';
import { AuthModule } from './modules/auth.module';
import { ConfigModule } from './modules/config.module';
import { TypeOrmModule } from './modules/typeorm.module';
import { RedisModule } from './modules/redis.module';
import { OrderModule } from './modules/domain/domain.order.module';
import { ProductModule } from './modules/domain/domain.product.module';
import { PaymentModule } from './modules/domain/domain.payment.module';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule,
        AuthModule,
        RedisModule,
        UserModule,
        OrderModule,
        ProductModule,
        PaymentModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
