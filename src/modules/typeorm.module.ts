import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { OrderEntity } from 'src/domain/order/repository/order.entity';
import { ProductEntity } from 'src/domain/product/repository/product.entity';
import { UserEntity } from 'src/domain/user/repository/user.entity';

@Module({
    imports: [
        NestTypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            // entities: [path.join(__dirname, '../../**/*.entity{.ts}')], // 절대경로 설정, 프로젝트 내 모든 entity.ts 파일 스캔하도록
            entities: [UserEntity, OrderEntity, ProductEntity],
            synchronize: true, // 재시작 시 항상 테이블 구조 등 동기화, Production에서는 false 권장
            logging: false // 콘솔에 실행되는 쿼리문 출력 등 DB로킹
        })
    ]
})
export class TypeOrmModule {}
