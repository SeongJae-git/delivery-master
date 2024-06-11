import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from 'src/domain/payment/controller/payment.controller';
import { PaymentEntity } from 'src/domain/payment/repository/payment.entity';
import { PaymentRepository } from 'src/domain/payment/repository/payment.repository';
import { PaymentService } from 'src/domain/payment/service/payment.service';

@Module({
    imports: [TypeOrmModule.forFeature([PaymentEntity])],
    controllers: [PaymentController],
    providers: [PaymentService, PaymentRepository],
    exports: []
})
export class PaymentModule {}
