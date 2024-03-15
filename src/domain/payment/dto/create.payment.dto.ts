import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreatePaymentDTO {
    @ApiProperty({ example: '김철수' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: '카드결제' })
    @IsNotEmpty()
    @IsString()
    method: string;

    @ApiProperty({ example: '토스뱅크' })
    @IsNotEmpty()
    @IsString()
    provider: string;

    @ApiProperty({ example: 9000 })
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @ApiProperty({ example: 'requesting' })
    @IsNotEmpty()
    @IsString()
    status: string;

    @ApiProperty({ example: '3e81f188-f8ca-ed32-9574-608f315894fc' })
    @IsNotEmpty()
    @IsUUID()
    order_uuid: string;

    // 서비스단에서 서버시간 기준 집어넣어줄 것
    payment_uuid: string;
    payment_time: string;
}
