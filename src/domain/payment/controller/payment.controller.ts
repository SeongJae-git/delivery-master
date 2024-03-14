import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PaymentService } from '../service/payment.service';
import { CreatePaymentDTO } from '../dto/create.payment.dto';

@Controller('/payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    // 결제정보 생성
    @Post('/')
    async createPayment(@Body() createPaymentDTO: CreatePaymentDTO) {
        return await this.paymentService.createPayment(createPaymentDTO);
    }

    // 결제정보 조회 by order_uuid(한 개의 주문에 분할결제 등이 있을 수 있기 때문)
    // 리턴타입 배열객체[]
    @Get('/order_uuid/:order_uuid')
    async detailPaymentOrderUUID(@Param('order_uuid') order_uuid: string) {
        return await this.paymentService.detailPaymentByOrderUUID(order_uuid);
    }

    // 결제정보 조회 by payment_uuid(한 개의 결제정보에 대한 라우터)
    // 리턴타입 단일 오브젝트[]
    @Get('/payment_uuid/:payment_uuid')
    async detailPaymentPaymentUUID(@Param('payment_uuid') payment_uuid: string) {
        return await this.paymentService.detailPaymentByPaymentUUID(payment_uuid);
    }

    // 결제대행 기관 등에서 승인, 거절 등 API 받아오기용 엔드포인트
    @Patch('/provider/:payment_uuid/status')
    async statusPayment(@Param('payment_uuid') payment_uuid: string, @Body('status') status: string) {
        // db반영용이기에 리턴값 없음 주의
        await this.paymentService.statusPayment(payment_uuid, status);
    }

    // 결제요청 취소 by order_uuid
    @Delete('/:payment_uuid')
    async deletePayment(@Param('payment_uuid') payment_uuid: string) {
        await this.paymentService.deletePayment(payment_uuid);
    }
}
