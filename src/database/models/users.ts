import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from 'typeorm';
import { ParkingStation } from './parkingStations';
import { Vehicle } from './vehicle';
import { Role } from '@/ultis/role';

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    role: Role;

    @OneToMany(() => ParkingStation, (parkingStation) => parkingStation.user)
    parkingStations: ParkingStation[];

    @OneToOne(() => Vehicle)
    @JoinColumn()
    vehicle: Vehicle;
}
