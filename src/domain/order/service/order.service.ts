import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDTO } from '../dto/create.order.dto';
import { OrderRepository } from '../repository/order.repository';
import { CommonUtil } from 'src/utils/common/common.util';
import { UserRepository } from 'src/domain/user/repository/user.repository';
import { PaymentRepository } from 'src/domain/payment/repository/payment.repository';
import { ErrorUtil } from 'src/utils/errors/error.util';
import { CheckUtil } from 'src/utils/common/check.util';

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly userRepository: UserRepository,
        private readonly paymentRepository: PaymentRepository
    ) {}

    private orderStatusList = ['requesting', 'denied', 'accept', 'cancel'];

    async createOrder(createOrderDTO: CreateOrderDTO) {
        try {
            const createDataSet = Object.assign(createOrderDTO, {
                ...createOrderDTO,
                order_uuid: CommonUtil.generateUUID(),
                order_time: CommonUtil.getCurrentTime()
            });

            // 이건 주문 입금 다 완료 되었을떄로 옮겨야함
            this.userRepository.updateAfterOrderByUserNo(createOrderDTO.orderby, createOrderDTO.price * 0.1, 1);

            return await this.orderRepository.create(createDataSet);
        } catch (e) {
            throw new BadRequestException(e.name);
        }
    }

    async listOrders(seller: number, order_status: string) {
        ErrorUtil.assertCheck(
            CheckUtil.isNumber(seller) && CheckUtil.isOrderStatus(order_status),
            `Invalid param value`
        );

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
