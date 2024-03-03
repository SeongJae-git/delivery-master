import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    order_no: number;

    @Column()
    order_uuid: string;

    @Column()
    order_time: string;

    @Column()
    receipt_time: string;

    @Column({ default: 'requesting' })
    receipt_status: string;

    @Column()
    product_no: number;

    @Column()
    orderby: number;

    @Column()
    destination: string;
}
