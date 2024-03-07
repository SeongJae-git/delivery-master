import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    order_no: number;

    @Column({ unique: true })
    order_uuid: string;

    @Column()
    order_time: string;

    @Column({ default: 'requesting' })
    order_status: string;

    @Column()
    orderby: number;

    @Column()
    seller: number;

    @Column({ nullable: true })
    receipt_time: string;

    @Column()
    product_no: number;

    @Column()
    destination: string;
}
