import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderDTO } from '../dto/create.order.dto';

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) {}

    async create(createOrderDTO: CreateOrderDTO) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        //todo
        await queryRunner.startTransaction('SERIALIZABLE');
        try {
            const { seller, orderby, ...rest } = createOrderDTO;
            const orderEntity = this.orderRepository.create({
                seller: { user_no: seller },
                orderby: { user_no: orderby },
                ...rest
            });

            return this.orderRepository.save(orderEntity);
        } catch (e) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
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
     * todo
     * OrderEntity에서 OneToMany를 생략한 후 join select를 ManyToOne가 있는
     * PaymentRepository에서 수행하려 하였지만, 주문 정보를 불러올 때 연관된 결제정보가 필요한 것이지
     * 결제정보 한 개만 유저에게 보여줄 일은 없다 생각되어 orderRepo에서 join select 진행
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
