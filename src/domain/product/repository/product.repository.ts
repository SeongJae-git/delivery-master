import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDTO } from '../dto/create.product.dto';
import { UpdateProductDTO } from '../dto/update.product.dto';

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) {}

    async createProduct(createProductDTO: CreateProductDTO) {
        const { seller, ...rest } = createProductDTO;
        const productEntity = this.productRepository.create({
            seller: { user_no: seller },
            ...rest
        });

        return this.productRepository.save(productEntity);
    }

    async listProducts(seller: number) {
        return this.productRepository.find({
            where: { seller: { user_no: seller } }
        });
    }

    async detailProduct(product_no: number) {
        const productEntity = await this.productRepository.findOne({
            where: { product_no: product_no }
        });

        if (!productEntity) {
            throw new NotFoundException('Product not found');
        }

        return productEntity;
    }

    async updateProduct(product_no: number, updateProductDTO: UpdateProductDTO) {
        const productEntity = await this.productRepository.findOne({
            where: { product_no: product_no }
        });

        if (!productEntity) {
            throw new NotFoundException('Product not found');
        }

        productEntity.product_no = product_no;
        Object.assign(productEntity, updateProductDTO);

        return this.productRepository.save(productEntity);
    }

    async deleteProduct(product_no: number) {
        const productEntity = await this.productRepository.findOne({
            where: { product_no: product_no }
        });

        if (!productEntity) {
            throw new NotFoundException('Product not found');
        }

        return this.productRepository.delete(productEntity);
    }
}
