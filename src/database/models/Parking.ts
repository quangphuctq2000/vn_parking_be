import {
    Column,
    Entity,
    IsNull,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Vehicle } from './vehicle';
import { ParkingStation } from './parkingStations';

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
        nullable: true,
        default: null,
    })
    checkOut: Date;

    @Column({
        type: 'double',
        default: null,
    })
    price: number;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.parkings)
    vehicle: Vehicle;

    @ManyToOne(() => ParkingStation, (parkingStation) => parkingStation.parkings)
    parkingStation: ParkingStation;

    @Column()
    vehicleIdentityNumber: string;
}
