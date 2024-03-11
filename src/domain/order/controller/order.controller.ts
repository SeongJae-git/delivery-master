import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JWTAccessGuard } from 'src/middleware/auth/guard/auth.jwt.access';
import { CreateOrderDTO } from '../dto/create.order.dto';
import { OrderService } from '../service/order.service';
import { ApiBody, ApiCookieAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(JWTAccessGuard)
@Controller('/order')
@ApiTags('Order API')
@ApiCookieAuth()
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    /**
     * createOrderDTO 클래스를 파라미터로 받아 주문을 생성하는 컨트롤러 라우터로 사용하도록 한다.
     */
    @Post('/')
    @ApiOperation({
        summary: '주문 생성',
        description: '수신한 JSON 데이터를 바탕으로 새 주문을 생성합니다.'
    })
    @ApiBody({ type: CreateOrderDTO })
    @ApiResponse({ status: 201, description: '성공적으로 새 주문을 생성하였습니다.' })
    @ApiResponse({ status: 400, description: '비정상적인 파라미터 값이 있습니다.' })
    @ApiResponse({ status: 401, description: '로그인 된 사용자가 아닙니다.' })
    async createOrder(@Body() createOrderDTO: CreateOrderDTO) {
        return await this.orderService.createOrder(createOrderDTO);
    }

    /**
     * seller, order_status(optinal) 값을 쿼리스트링으로 받아 주문 목록을 반환하는 라우터로 사용하도록 한다.
     * 이때, 주문 정보와 주문자(user)의 정보도 같이 전달해주도록 한다.
     */
    @Get('/')
    @ApiOperation({
        summary: '접수된 주문 목록',
        description: `특정 판매자의 값으로 해당 판매자의 주문 목록을 불러오며, order_status값 없이 요청 시 모든 상태의 주문을 반환하고 
                    특정 상태의 값을 입력하면 해당 상태의 주문 목록만 불러옵니다.`
    })
    @ApiQuery({ name: 'seller', description: '특정 판매자 번호', example: 1 })
    @ApiQuery({
        name: 'order_status',
        description: '주문 상태 필터(requesting, accept, denied, cancel)',
        example: 'accept'
    })
    @ApiResponse({ status: 201, description: '성공적으로 주문 목록을 불러왔습니다.' })
    @ApiResponse({ status: 400, description: '비정상적인 파라미터 값이 있습니다.' })
    @ApiResponse({ status: 401, description: '로그인 된 사용자가 아닙니다.' })
    async listOrders(@Query('seller') seller: number, @Query('order_status') order_status: string) {
        return await this.orderService.listOrders(seller, order_status);
    }

    /**
     * 주문번호(UUID) 값을 파라미터로 받아 해당 주문에 대한 상세정보를 반환하는 라우터로 사용하도록 한다.
     */
    @Get('/:order_uuid')
    @ApiOperation({
        summary: '주문 상세정보',
        description: '주문번호(UUID) 값을 파라미터로 받아 해당 주문의 상세정보를 반환합니다.'
    })
    @ApiParam({
        name: 'order_uuid',
        description: '확인할 주문의 UUID',
        example: '733717af-a4c3-9cb2-eaf3-55e040170cb6'
    })
    @ApiResponse({ status: 201, description: '성공적으로 주문 정보를 불러왔습니다.' })
    @ApiResponse({ status: 400, description: '비정상적인 파라미터 값이 있습니다.' })
    @ApiResponse({ status: 401, description: '로그인 된 사용자가 아닙니다.' })
    async detailOrder(@Param('order_uuid') order_uuid: string) {
        return await this.orderService.detailOrder(order_uuid);
    }

    /**
     * 상태를 수정할 주문의 UUID와 설정할 상태를 파라미터로 받아 해당 주문의 상태를 업데이트하는 라우터로 사용하도록 한다.
     */
    @Patch('/:order_uuid/:order_status')
    @ApiOperation({
        summary: '주문 상태 변경',
        description: '주문번호(UUID)와 변경할 상태를 파라미터로 받아 해당 주문의 상태를 업데이트합니다.'
    })
    @ApiParam({
        name: 'order_uuid',
        description: '변경할 주문의 UUID',
        example: '733717af-a4c3-9cb2-eaf3-55e040170cb6'
    })
    @ApiParam({ name: 'order_status', description: '변경하고자 하는 상태', example: 'cancel' })
    @ApiResponse({ status: 201, description: '성공적으로 주문 상태를 수정했습니다.' })
    @ApiResponse({ status: 400, description: '비정상적인 파라미터 값이 있습니다.' })
    @ApiResponse({ status: 401, description: '로그인 된 사용자가 아닙니다.' })
    async changeOrderStatus(@Param('order_uuid') order_uuid: string, @Param('order_status') order_status: string) {
        return await this.orderService.changeOrderStatus(order_uuid, order_status);
    }
}
