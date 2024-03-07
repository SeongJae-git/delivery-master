import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from 'src/domain/order/controller/order.controller';
import { OrderEntity } from 'src/domain/order/repository/order.entity';
import { OrderRepository } from 'src/domain/order/repository/order.repository';
import { OrderService } from 'src/domain/order/service/order.service';

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity])],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository],
    exports: []
})
export class OrderModule {}
