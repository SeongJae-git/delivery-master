import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrderDTO {
    // 입력 필수값
    @IsNotEmpty()
    @IsNumber()
    product_no: number;

    @IsNotEmpty()
    @IsNumber()
    orderby: number;

    @IsNotEmpty()
    @IsNumber()
    seller: number;

    @IsNotEmpty()
    @IsString()
    destination: string;

    // 나머지 서버의 서비스단에서 설정해주는 값이기에 필수값이 아님
    // 하지만 입력을 받을 수는 있게 옵셔널 설정
    @IsOptional()
    @IsUUID()
    order_uuid?: string;

    @IsOptional()
    @IsDateString()
    order_time?: string;

    @IsOptional()
    @IsString()
    order_status?: string;
}
