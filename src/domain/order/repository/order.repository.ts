import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>
    ) {}

    async insertOrder() {}

    async findOrderByOrderNo() {}

    async findOrderByOrderUUID() {}

    async updateOrder() {}

    async deleteOrder() {}
}
