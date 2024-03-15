import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDTO } from '../dto/create.payment.dto';

@Injectable()
export class PaymentRepository {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>
    ) {}

    async createPayment(createPaymentDTO: CreatePaymentDTO) {
        const { order_uuid, ...rest } = createPaymentDTO;
        const paymentEntity = this.paymentRepository.create({
            order_uuid: { order_uuid: order_uuid },
            ...rest
        });

        console.log(paymentEntity);

        return this.paymentRepository.save(paymentEntity);
    }

    async detailPaymentByOrderUUID(order_uuid: string) {
        return this.paymentRepository.find({
            where: { order_uuid: { order_uuid: order_uuid } }
        });
    }

    async detailPaymentByPaymentUUID(payment_uuid: string) {
        return this.paymentRepository.find({
            where: { payment_uuid: payment_uuid }
        });
    }

    async updatePaymentStatus(payment_uuid: string, status: string) {
        const targetPayment = await this.paymentRepository.findOne({
            where: { payment_uuid: payment_uuid }
        });

        if (!targetPayment) {
            throw new NotFoundException('Payment not found!');
        }

        const paymentEntity = Object.assign(targetPayment, { status: status });

        return this.paymentRepository.save(paymentEntity);
    }

    async deletePayment(payment_uuid: string) {
        const targetPayment = await this.paymentRepository.findOne({
            where: { payment_uuid: payment_uuid }
        });

        if (!targetPayment) {
            throw new NotFoundException('Payment not found!');
        }

        return this.paymentRepository.delete(targetPayment);
    }
}
