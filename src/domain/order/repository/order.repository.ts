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

    /**
     * @todo 기준점이 되는 테이블 바꿀 것
     */
    async findOrderByOrderUUID(order_uuid: string) {
        const orderDetails = await this.orderRepository
            .createQueryBuilder('orders')
            .leftJoinAndSelect('orders.payments', 'payments')
            .where('orders.order_uuid=:order_uuid', { order_uuid })
            .select(['orders.order_uuid', 'payments'])
            .getOne();

        return orderDetails;
    }

    async updateStatusByUUID(order_uuid: string, order_status: string) {
        const orderEntity = await this.orderRepository.findOne({ where: { order_uuid: order_uuid } });

        orderEntity.order_status = order_status;

        return this.orderRepository.save(orderEntity);
    }
}
