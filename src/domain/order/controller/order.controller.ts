import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JWTAccessGuard } from 'src/middleware/auth/guard/auth.jwt.access';
import { CreateOrderDTO } from '../dto/create.order.dto';
import { OrderService } from '../service/order.service';

@UseGuards(JWTAccessGuard)
@Controller('/order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    // 주문 생성(가게에 요청을 생성)
    @Post('/')
    async createOrder(@Body() createOrderDTO: CreateOrderDTO) {
        return await this.orderService.create(createOrderDTO);
    }

    // 주문 확인(주문정보 확인하고자 요청)
    @Get('/:{order_uuid}')
    async infoOrder() {}

    // 주문 리스트 확인(내 가게에 들어온 주문들이 뭐뭐있는지)
    @Get('/list/:{seller}')
    async listOrder() {}

    // 주문 상태 설정?(가게가 확인하고 수락이나 거절, 주문취소 등)
    @Patch('/:{order_uuid}/set/:{appept, denied 등?}')
    async changeStatusOrder() {}
}
