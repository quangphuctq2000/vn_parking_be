import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from './vehicle';
import { ParkingStation } from './parkingStations';
import { BookingType } from '@/ultis/const';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.id)
    vehicle: Vehicle;

    @ManyToOne(() => ParkingStation, (parkingStation) => parkingStation.id)
    parkingStation: ParkingStation;

    @Column({ type: 'datetime' })
    from: Date;

    @Column({ type: 'datetime' })
    to: Date;

    @Column()
    price: number;

    @Column()
    type: BookingType;
}
