import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
        type: 'datetime',
        default: null,
    })
    checkOut: Date;

    @Column({
        type: 'double',
        default: null,
    })
    price: number;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.id)
    vehicle: Vehicle;

    @ManyToOne(() => ParkingStation, (parkingStation) => parkingStation.id)
    parkingStation: ParkingStation;

    @Column()
    vehicleIdentityNumber: string;
}
