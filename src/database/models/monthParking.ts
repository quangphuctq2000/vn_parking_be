import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ParkingStation } from './parkingStations';
import { Vehicle } from './vehicle';

@Entity()
export class MonthParking {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ParkingStation, (parkingStation) => parkingStation.id)
    parkingStation: ParkingStation;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.id)
    vehicle: Vehicle;

    @Column()
    month: number;
}
