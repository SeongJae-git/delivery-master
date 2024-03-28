/**
 * 2024-03-28
 * payment의 기능을 order의 service에서 같이 처리하며, payment의 컨트롤러 더이상 사용하지 않음
 */

// import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
// import { PaymentService } from '../service/payment.service';
// import { CreatePaymentDTO } from '../dto/create.payment.dto';
// import { JWTAccessGuard } from 'src/middleware/auth/guard/auth.jwt.access';
// import {
//     ApiBadRequestResponse,
//     ApiBody,
//     ApiOperation,
//     ApiParam,
//     ApiResponse,
//     ApiTags,
//     ApiUnauthorizedResponse
// } from '@nestjs/swagger';

// @UseGuards(JWTAccessGuard)
// @Controller('/payment')
// @ApiTags('Payment API')
// @ApiBadRequestResponse({ description: '올바르지 않은 파라미터(Query, Body, Param) 값이 존재합니다.' })
// @ApiUnauthorizedResponse({ description: '권한이 없거나 만료되었습니다. 로그인을 통해 토큰을 발급받아야 합니다.' })
// export class PaymentController {
//     constructor(private readonly paymentService: PaymentService) {}

//     /**
//      * createPaymentDTO 클래스를 파라미터로 받아 결제정보를 생성하도록 한다.
//      */
//     @Post('/')
//     @ApiOperation({
//         summary: '결제정보 생성',
//         description: '받아온 JSON데이터를 바탕으로 새 결제정보를 생성합니다.'
//     })
//     @ApiBody({ type: CreatePaymentDTO })
//     @ApiResponse({ status: 201, description: '성공적으로 새 결제정보를 생성하였습니다.' })
//     async createPayment(@Body() createPaymentDTO: CreatePaymentDTO) {
//         return await this.paymentService.createPayment(createPaymentDTO);
//     }

//     /**
//      * order_uuid값을 파라미터로 받아 해당 주문과 연관된 모든 결제정보를 불러오도록 한다.
//      */
//     @Get('/order/:order_uuid')
//     @ApiOperation({
//         summary: '주문의 결제정보 목록',
//         description: '특정 주문의 UUID값으로 해당 주문과 연관된 모든 결제 정보들을 불러옵니다.'
//     })
//     @ApiParam({
//         name: 'order_uuid',
//         description: '결제정보들을 확인할 주문의 UUID',
//         example: '3e81f188-f8ca-ed32-9574-608f315894fc'
//     })
//     @ApiResponse({ status: 201, description: '성공적으로 해당 주문과 관련된 결제정보들을 불러왔습니다.' })
//     async detailPaymentOrderUUID(@Param('order_uuid') order_uuid: string) {
//         return await this.paymentService.detailPaymentByOrderUUID(order_uuid);
//     }

//     /**
//      * payment_uuid값을 파라미터로 받아 해당 값과 일치하는 결제정보를 불러오도록 한다.
//      */
//     @Get('/:payment_uuid')
//     @ApiOperation({
//         summary: '결제 상세정보',
//         description: '특정 결제의 UUID값으로 해당 결제의 상세한 정보를 불러옵니다.'
//     })
//     @ApiParam({
//         name: 'payment_uuid',
//         description: '확인할 결제정보의 UUID',
//         example: 'd6459536-85c0-ffb8-de77-86384f016ad7'
//     })
//     @ApiResponse({ status: 201, description: '성공적으로 해당 결제정보를 불러왔습니다.' })
//     async detailPaymentPaymentUUID(@Param('payment_uuid') payment_uuid: string) {
//         return await this.paymentService.detailPaymentByPaymentUUID(payment_uuid);
//     }

//     /**
//      * payment_uuid(Param), status(Body)데이터를 받으며, 타 결제대행사의 API를 활용한다면 결제 성공, 실패 등의 여부를 받아와
//      * DB에 저장하는 용도로 사용하도록 한다.
//      */
//     @Patch('/:payment_uuid/status')
//     @ApiOperation({
//         summary: '결제 상태 변경',
//         description:
//             '타 결제대행사 등의 API 사용 시 결제 성공, 실패 등의 여부를 받아 DB의 결제정보 상태를 업데이트합니다.'
//     })
//     @ApiParam({
//         name: 'payment_uuid',
//         description: '업데이트할 결제정보의 UUID',
//         example: 'd6459536-85c0-ffb8-de77-86384f016ad7'
//     })
//     @ApiBody({ schema: { properties: { status: { type: 'string', example: 'approved' } } } })
//     @ApiResponse({
//         status: 201,
//         description: '성공적으로 해당 결제정보의 상태를 업데이트 하였으며, 리턴값은 없습니다.'
//     })
//     async statusPayment(@Param('payment_uuid') payment_uuid: string, @Body('status') status: string) {
//         // db반영용이기에 리턴값 없음 주의
//         await this.paymentService.statusPayment(payment_uuid, status);
//     }

//     /**
//      * payment_uuid값을 파라미터로 받아 해당 결제건을 삭제시키는 용도로 사용하도록 한다.
//      * 하지만, 결제정보의 상태만 업데이트 하고 실질적으로 삭제하는 서비스 로직은 포함시키지 않도록 유의
//      */
//     @Delete('/:payment_uuid')
//     @ApiOperation({
//         summary: '결제 정보 삭제',
//         description:
//             '특정 결제정보를 삭제시키지만, 결제정보의 상태만 업데이트하고 실질적으로 삭제하는 서비스 로직은 구현하지 않도록 유의해야합니다.'
//     })
//     @ApiParam({
//         name: 'payment_uuid',
//         description: '삭제할 결제정보의 UUID',
//         example: 'd6459536-85c0-ffb8-de77-86384f016ad7'
//     })
//     @ApiResponse({ status: 201, description: '성공적으로 해당 결제정보를 삭제하였습니다.' })
//     async deletePayment(@Param('payment_uuid') payment_uuid: string) {
//         await this.paymentService.deletePayment(payment_uuid);
//     }
// }
