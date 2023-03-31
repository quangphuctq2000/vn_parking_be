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
import { MonthParking } from './monthParking';

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

    @ManyToOne(() => User, (user) => user.vehicle)
    user: User;

    @OneToMany(() => Parking, (parking) => parking.vehicle)
    parkings: Parking[];

    @OneToMany(() => Booking, (booking) => booking.vehicle)
    bookings: Booking[];

    @OneToMany(() => MonthParking, (monthParking) => monthParking.vehicle)
    monthParkings: MonthParking[];
}
