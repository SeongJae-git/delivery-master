import { OrderEntity } from 'src/domain/order/repository/order.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments')
export class PaymentEntity {
    @PrimaryGeneratedColumn()
    payment_no: number;

    @Column()
    name: string; // 김철수

    @Column()
    method: string; // 무통장입금, 실시간계좌이체, 카드결제, 가상계좌, 간편결제

    @Column()
    provider: string; // 국민은행, 카카오뱅크, 토스

    @Column()
    amount: number; // 9000

    @Column()
    payment_time: string; // 2024-03-14

    @Column()
    status: string; // approved, rejected, waiting, requesting

    @Column()
    payment_uuid: string;

    @OneToOne(() => OrderEntity, { nullable: false })
    @JoinColumn({ name: 'order_uuid' })
    order_uuid: OrderEntity;
}
