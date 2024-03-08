import { UserEntity } from 'src/domain/user/repository/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    order_no: number;

    @Column({ unique: true })
    order_uuid: string;

    @Column()
    order_time: Date;

    @Column({ default: 'requesting' })
    order_status: string;

    @Column()
    seller: number;

    @Column({ nullable: true })
    receipt_time: Date;

    @Column()
    product_no: number;

    @Column()
    destination: string;

    @ManyToOne(() => UserEntity, (user) => user.orders, { nullable: false })
    @JoinColumn({ name: 'orderby' })
    orderby: UserEntity;
}
