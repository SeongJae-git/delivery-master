import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from '../dto/create.order.dto';

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>
    ) {}

    async create(createOrderDTO: CreateOrderDTO) {
        return this.orderRepository.insert(createOrderDTO);
        // return this.orderRepository.create(createOrderDTO);
    }

    async findOrderByOrderNo(order_no: number) {
        return this.orderRepository.findOne({
            where: { order_no: order_no }
        });
    }

    async findOrderByOrderUUID(order_uuid: string) {
        return this.orderRepository.findOne({
            where: { order_uuid: order_uuid }
        });
    }

    async findOrderListBySeller(seller: number) {
        return this.orderRepository.find({
            where: { seller: seller }
        });
    }

    async update(updateOrderDTO: any) {
        // dto 마저 만들어서 바꿔야함
        return this.orderRepository.save(updateOrderDTO);
    }
}
