import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDTO {
    @IsNotEmpty()
    @IsNumber()
    product_no: number;

    @IsNotEmpty()
    @IsNumber()
    orderby: number;

    @IsNotEmpty()
    @IsString()
    destination: string;
}
