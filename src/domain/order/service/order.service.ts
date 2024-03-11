import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDTO } from '../dto/create.order.dto';
import { OrderRepository } from '../repository/order.repository';
import { CommonUtil } from 'src/utils/common/CommonUtil';

@Injectable()
export class OrderService {
    constructor(private readonly orderRepository: OrderRepository) {}

    private orderStatusList = ['requesting', 'denied', 'accept', 'cancel'];

    async createOrder(createOrderDTO: CreateOrderDTO) {
        try {
            const createDataSet = Object.assign(createOrderDTO, {
                ...createOrderDTO,
                order_uuid: CommonUtil.generateUUID(),
                order_time: CommonUtil.getCurrentTime()
            });

            return await this.orderRepository.create(createDataSet);
        } catch (e) {
            throw new BadRequestException(e.name);
        }
    }

    async listOrders(seller: number, order_status: string) {
        if (Number.isNaN(seller)) {
            throw new BadRequestException('Invalid seller value');
        }
        if (order_status !== undefined && !this.orderStatusList.includes(order_status)) {
            throw new BadRequestException('Invalid order status value');
        }

        return this.orderRepository.findOrderListBySeller(seller, order_status);
    }

    async detailOrder(order_uuid: string) {
        return this.orderRepository.findOrderByOrderUUID(order_uuid);
    }

    async changeOrderStatus(order_uuid: string, order_status: string) {
        if (!this.orderStatusList.includes(order_status)) {
            throw new BadRequestException('Invalid order status value');
        }

        return this.orderRepository.updateStatusByUUID(order_uuid, order_status);
    }
}
