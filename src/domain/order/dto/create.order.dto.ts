import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrderDTO {
    // 입력 필수값들
    @ApiProperty({ description: '상품 번호', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    product_no: number;

    @ApiProperty({ description: '주문자 번호', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    orderby: number;

    @ApiProperty({ description: '판매자 번호', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    seller: number;

    @ApiProperty({ description: '배송지 정보', example: '서울시 강북구 00-00번지' })
    @IsNotEmpty()
    @IsString()
    destination: string;

    // 나머지 서버의 서비스단에서 설정해주는 값이기에 필수값이 아님
    // 하지만 입력을 받을 수는 있게 옵셔널 설정
    @ApiHideProperty()
    @IsOptional()
    @IsUUID()
    order_uuid?: string;

    @ApiHideProperty()
    @IsOptional()
    @IsDateString()
    order_time?: string;

    @ApiHideProperty()
    @IsOptional()
    @IsString()
    order_status?: string;
}
