import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { CreateProductDTO } from '../dto/create.product.dto';
import { UpdateProductDTO } from '../dto/update.product.dto';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async createProduct(createProductDTO: CreateProductDTO) {
        return await this.productRepository.createProduct(createProductDTO);
    }

    async listProducts(seller: number) {
        return await this.productRepository.listProducts(seller);
    }

    async detailProduct(product_no: number) {
        return await this.productRepository.detailProduct(product_no);
    }

    async updateProduct(product_no: number, updateProductDTO: UpdateProductDTO) {
        return await this.productRepository.updateProduct(product_no, updateProductDTO);
    }

    async deleteProduct(product_no: number) {
        return await this.productRepository.deleteProduct(product_no);
    }
}
