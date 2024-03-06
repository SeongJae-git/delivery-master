import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    order_no: number;

    @Column({ unique: true })
    order_uuid: string;

    @Column()
    order_time: string;

    @Column()
    order_status: string;

    @Column()
    receipt_time: string;

    @Column()
    product_no: number;

    @Column()
    orderby: number;

    @Column()
    destination: string;
}
