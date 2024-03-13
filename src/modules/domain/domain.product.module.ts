import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from 'src/domain/product/controller/product.controller';
import { ProductEntity } from 'src/domain/product/repository/product.entity';
import { ProductRepository } from 'src/domain/product/repository/product.repository';
import { ProductService } from 'src/domain/product/service/product.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
    exports: []
})
export class ProductModule {}
