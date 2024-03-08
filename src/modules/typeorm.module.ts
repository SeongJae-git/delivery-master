import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/domain/order/repository/order.entity';
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
            entities: [UserEntity, OrderEntity], // entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: true
        })
    ]
})
export class TypeOrmModule {}
