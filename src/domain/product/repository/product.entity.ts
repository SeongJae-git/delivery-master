import { UserEntity } from 'src/domain/user/repository/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    product_no: number;

    @Column()
    image: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @ManyToOne(() => UserEntity, { nullable: false })
    @JoinColumn({ name: 'seller', referencedColumnName: 'user_no' })
    seller: UserEntity;
}
