import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users';

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    identityNumber: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
