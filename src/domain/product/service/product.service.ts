import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { CreateProductDTO } from '../dto/create.product.dto';
import { UpdateProductDTO } from '../dto/update.product.dto';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async createProduct(createProductDTO: CreateProductDTO) {
        return this.productRepository.createProduct(createProductDTO);
    }

    async listProducts(seller: number) {
        return this.productRepository.listProductsBySeller(seller);
    }

    async detailProduct(product_no: number) {
        return this.productRepository.detailProductByProductNo(product_no);
    }

    async updateProduct(product_no: number, updateProductDTO: UpdateProductDTO) {
        return this.productRepository.updateProductByProductNo(product_no, updateProductDTO);
    }

    async deleteProduct(product_no: number) {
        return this.productRepository.deleteProductByProductNo(product_no);
    }
}
