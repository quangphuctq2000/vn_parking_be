import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from './vehicle';
import { ParkingStation } from './parkingStations';
import { BookingType } from '@/ultis/const';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.bookings)
    vehicle: Vehicle;

    @ManyToOne(
        () => ParkingStation,
        (parkingStation) => parkingStation.bookings,
    )
    parkingStation: ParkingStation;

    @Column({ type: 'datetime' })
    from: Date;

    @Column({ type: 'datetime' })
    to: Date;

    @Column()
    price: number;

    @Column({ default: null })
    type: BookingType;
}
