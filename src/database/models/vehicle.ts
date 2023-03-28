import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users';
import { Parking } from './parking';
import { Booking } from './booking';

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    identityNumber: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @OneToMany(() => Parking, (parking) => parking.id)
    parkings: Parking[];

    @OneToMany(() => Booking, (booking) => booking.id)
    booking: Booking;
}
