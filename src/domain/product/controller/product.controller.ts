import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { JWTAccessGuard } from 'src/middleware/auth/guard/auth.jwt.access';
import { CreateProductDTO } from '../dto/create.product.dto';
import { UpdateProductDTO } from '../dto/update.product.dto';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';

@UseGuards(JWTAccessGuard)
@Controller('/product')
@ApiTags('Product API')
@ApiBadRequestResponse({ description: '올바르지 않은 파라미터(Query, Body, Param) 값이 존재합니다.' })
@ApiUnauthorizedResponse({ description: '권한이 없거나 만료되었습니다. 로그인을 통해 토큰을 발급받아야 합니다.' })
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    /**
     * createProductDTO 클래스를 파라미터로 받아 물품을 생성하는 라우터로 사용하도록 한다.
     */
    @Post('/')
    @ApiOperation({
        summary: '물품 생성',
        description: '수신한 JSON 데이터를 바탕으로 새 풀품을 등록합니다.'
    })
    @ApiBody({ type: CreateProductDTO })
    @ApiResponse({ status: 201, description: '성공적으로 물품을 등록하였습니다.' })
    async createProduct(@Body() createProductDTO: CreateProductDTO) {
        return await this.productService.createProduct(createProductDTO);
    }

    /**
     * seller 값을 쿼리스트링으로 받아 해당 판매자의 리스트를 가져오도록 한다.
     */
    @Get('/')
    @ApiOperation({
        summary: '판매자의 물품 목록',
        description: '특정 판매자의 값으로 해당 판매자가 판매중인 물건 목록을 불러옵니다.'
    })
    @ApiQuery({ name: 'seller', description: '특정 판매자 번호', example: 1 })
    @ApiResponse({ status: 201, description: '성공적으로 판매중인 물품 목록을 불러왔습니다.' })
    async productList(@Query('seller') seller: number) {
        return await this.productService.listProducts(seller);
    }

    @Get('/:product_no')
    @ApiOperation({
        summary: '물품의 상세정보',
        description: '특정 물품의 상세정보를 모두 불러옵니다.'
    })
    @ApiParam({ name: 'product_no', description: '특정 물품 번호', example: 1 })
    @ApiResponse({ status: 201, description: '성공적으로 특정 물품의 정보를 불러왔습니다.' })
    async productDetail(@Param('product_no') product_no: number) {
        return await this.productService.detailProduct(product_no);
    }

    /**
     * product_no(Param), updateDTO(body) 데이터를 받아 해당 물건의 정보를 수정하는 라우터로 사용하도록 한다.
     */
    @Patch('/:product_no')
    @ApiOperation({
        summary: '물품 정보 수정',
        description: '물품 번호값을 파라미터로 해당 물품의 정보를 수정합니다.'
    })
    @ApiParam({ name: 'product_no', description: '특정 물품 번호', example: 1 })
    @ApiResponse({ status: 201, description: '성공적으로 물품 정보를 수정하였습니다.' })
    async updateProduct(@Param('product_no') product_no: number, @Body() updateProductDTO: UpdateProductDTO) {
        return await this.productService.updateProduct(product_no, updateProductDTO);
    }

    /**
     * product_no 값을 파라미터로 받아 해당 물건을 삭제하는 라우터로 사용하도록 한다.
     */
    @Delete('/:product_no')
    @ApiOperation({
        summary: '물품 삭제',
        description: '물품 번호값을 파라미터로 받아 해당 물품을 삭제합니다.'
    })
    @ApiParam({ name: 'product_no', description: '특정 물품 번호' })
    @ApiResponse({ status: 201, description: '성공적으로 해당 물품을 삭제하였습니다.' })
    async deleteProduct(@Param('product_no') product_no: number) {
        return await this.productService.deleteProduct(product_no);
    }
}
