import { OrderEntity } from 'src/domain/order/repository/order.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments')
export class PaymentEntity {
    @PrimaryGeneratedColumn()
    payment_no: number;

    @Column()
    name: string;

    @Column()
    method: string;

    @Column()
    amount: number;

    @Column()
    paymentTime: string;

    @Column()
    approval: string;

    @OneToOne(() => OrderEntity, { nullable: false })
    @JoinColumn({ name: 'orderUUID' })
    orderUUID: OrderEntity;
}
