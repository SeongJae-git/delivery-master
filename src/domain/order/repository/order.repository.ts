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
        const { seller, orderby, ...rest } = createOrderDTO;
        const orderEntity = this.orderRepository.create({
            seller: { user_no: seller },
            orderby: { user_no: orderby },
            ...rest
        });

        return this.orderRepository.save(orderEntity);
    }

    async findOrderListBySeller(seller: number, order_status?: string) {
        const orders = await this.orderRepository.find({
            where: { seller: { user_no: seller }, order_status: order_status },
            relations: ['seller', 'orderby']
        });

        return orders.map((orderEntity) => ({
            ...orderEntity,
            seller: orderEntity.seller.user_no,
            orderby: orderEntity.orderby.user_no
        }));
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
