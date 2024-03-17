import { UserEntity } from 'src/domain/user/repository/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
    @PrimaryColumn({ unique: true })
    order_uuid: string;

    @Column()
    order_time: Date;

    @Column({ default: 'requesting' })
    order_status: string;

    @Column({ nullable: true })
    receipt_time: Date;

    @Column()
    product_no: number;

    @Column()
    price: number;

    @Column()
    destination: string;

    @ManyToOne(() => UserEntity, { nullable: false })
    @JoinColumn({ name: 'seller', referencedColumnName: 'user_no' })
    seller: UserEntity;

    @ManyToOne(() => UserEntity, { nullable: false })
    @JoinColumn({ name: 'orderby', referencedColumnName: 'user_no' })
    orderby: UserEntity;
}
