import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreatePaymentDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    method: string;

    @IsNotEmpty()
    @IsString()
    provider: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsUUID()
    order_uuid: string;

    // 서비스단에서 서버시간 기준 집어넣어줄 것
    payment_uuid: string;
    payment_time: string;
}
