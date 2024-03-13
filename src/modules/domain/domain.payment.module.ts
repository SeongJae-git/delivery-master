import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/domain/payment/repository/payment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PaymentEntity])],
    controllers: [],
    providers: [],
    exports: []
})
export class PaymentModule {}
