import { OrderEntity } from 'src/domain/order/repository/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    user_no: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column({ default: 0 })
    order_count: number;

    @Column({ default: 0 })
    point: number;

    @Column({ default: false })
    seller: boolean;

    // order 테이블과의 관계 설정
    // 추가 다른 테이블도 이런식으로 명시해야함.
    // 관계를 명시하는 것일 뿐이지 필드가 추가되는 것이 아님을 생각할것
    @OneToMany(() => OrderEntity, (order) => order.orderby)
    orders: OrderEntity[];
}
