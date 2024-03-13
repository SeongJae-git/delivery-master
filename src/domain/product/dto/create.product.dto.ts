import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
    @ApiProperty({ description: '물품 이름', example: '국밥' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: '이미지 경로', example: '/public/img/국밥.png' })
    @IsNotEmpty()
    @IsString()
    image: string;

    @ApiProperty({ description: '물품 설명', example: '역시 국밥은 부산국밥이지요' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ description: '물품 가격', example: 7000 })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({ description: '물품 판매자 번호', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    seller: number;
}
