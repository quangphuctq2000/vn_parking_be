import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from './vehicle';
import { ParkingLot } from './parkingLots';

@Entity()
export class Parking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'datetime',
        default: null,
    })
    checkIn: Date;

    @Column({
        type: 'datetime',
        default: null,
    })
    checkOut: Date;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.id)
    vehicle: Vehicle;

    @ManyToOne(() => ParkingLot, (parkingLot) => parkingLot.id)
    parkingLot: ParkingLot;
}
