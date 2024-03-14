import { Injectable } from '@nestjs/common';
import { PaymentRepository } from '../repository/payment.repository';
import { CreatePaymentDTO } from '../dto/create.payment.dto';
import { CommonUtil } from 'src/utils/common/CommonUtil';

@Injectable()
export class PaymentService {
    constructor(private readonly paymentRepository: PaymentRepository) {}

    async createPayment(createPaymentDTO: CreatePaymentDTO) {
        const createDataSet: CreatePaymentDTO = Object.assign(createPaymentDTO, {
            ...createPaymentDTO,
            payment_uuid: CommonUtil.generateUUID(),
            payment_time: CommonUtil.getCurrentTime()
        });

        return this.paymentRepository.createPayment(createDataSet);
    }

    async detailPaymentByOrderUUID(order_uuid: string) {
        return this.paymentRepository.detailPaymentByOrderUUID(order_uuid);
    }

    async detailPaymentByPaymentUUID(payment_uuid: string) {
        return this.paymentRepository.detailPaymentByPaymentUUID(payment_uuid);
    }

    async statusPayment(payment_uuid: string, status: string) {
        return this.paymentRepository.updatePaymentStatus(payment_uuid, status);
    }

    async deletePayment(payment_uuid: string) {
        return this.paymentRepository.deletePayment(payment_uuid);
    }
}
