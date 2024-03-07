import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from '../dto/create.order.dto';
import { OrderRepository } from '../repository/order.repository';
import { CommonUtil } from 'src/utils/common/CommonUtil';

@Injectable()
export class OrderService {
    constructor(private readonly orderRepository: OrderRepository) {}

    async create(createOrderDTO: CreateOrderDTO) {
        createOrderDTO.order_uuid = CommonUtil.generateUUID();
        createOrderDTO.order_time = CommonUtil.getCurrentTime();

        return this.orderRepository.create(createOrderDTO);
    }
}
