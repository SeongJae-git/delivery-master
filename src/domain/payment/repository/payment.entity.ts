import { OrderEntity } from 'src/domain/order/repository/order.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('payments')
export class PaymentEntity {
    @PrimaryColumn({ unique: true })
    payment_uuid: string;

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

    @ManyToOne(() => OrderEntity, { nullable: false })
    @JoinColumn({ name: 'order_uuid', referencedColumnName: 'order_uuid' })
    order: OrderEntity;
}
