import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDTO {
    @ApiProperty({ description: '물건 이름', example: '국밥' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: '물건 이미지 경로', example: '/public/img/국밥.png' })
    @IsNotEmpty()
    @IsString()
    image: string;

    @ApiProperty({ description: '물건 설명', example: '역시 국밥은 순대국밥이지요' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ description: '물건 가격', example: 9000 })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({ description: '물건 판매자 번호', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    seller: number;
}
