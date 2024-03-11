import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    user_no: number;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column({ default: 0 })
    order_count: number;

    @Column({ default: 0 })
    point: number;

    @Column({ default: false, select: false })
    seller: boolean;
}
