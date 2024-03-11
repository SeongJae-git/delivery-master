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
        const { orderby, ...rest } = createOrderDTO;
        const orderEntity = this.orderRepository.create({
            ...rest,
            orderby: { user_no: orderby }
        });

        return this.orderRepository.save(orderEntity);
    }

    async findOrderListBySeller(seller: number, order_status?: string) {
        return this.orderRepository.find({
            where: { seller: seller, order_status: order_status },
            relations: ['orderby'],
            select: ['orderby']
        });
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

    async updateStatusByUUID(order_uuid: string, order_status: string) {
        const orderEntity = await this.orderRepository.findOne({ where: { order_uuid: order_uuid } });

        orderEntity.order_status = order_status;

        return this.orderRepository.save(orderEntity);
    }
}
