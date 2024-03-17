import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from 'src/domain/order/controller/order.controller';
import { OrderEntity } from 'src/domain/order/repository/order.entity';
import { OrderRepository } from 'src/domain/order/repository/order.repository';
import { OrderService } from 'src/domain/order/service/order.service';
import { PaymentEntity } from 'src/domain/payment/repository/payment.entity';
import { PaymentRepository } from 'src/domain/payment/repository/payment.repository';
import { UserEntity } from 'src/domain/user/repository/user.entity';
import { UserRepository } from 'src/domain/user/repository/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity, PaymentEntity])],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository, UserRepository, PaymentRepository],
    exports: []
})
export class OrderModule {}
