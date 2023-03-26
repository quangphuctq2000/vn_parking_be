import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ParkingLot } from './parkingLots';
import { User } from './users';

@Entity()
export class ParkingStation {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'double',
    })
    longitude: number;

    @Column({
        type: 'double',
    })
    latitude: number;

    @Column({
        type: 'varchar',
        default: '',
    })
    description: string;

    @Column({
        type: 'int',
        default: 0,
    })
    parkingLotNumber: number;

    @Column({
        type: 'double',
        default: 0,
    })
    pricePerHour: number;

    @Column({
        type: 'double',
        default: 0,
    })
    pricePerMonth: number;

    // @OneToMany(() => ParkingLot, (parkingLot) => parkingLot.parkingStation)
    // parkingLots: ParkingLot[];

    @ManyToOne(() => User, (user) => user.parkingStations)
    user: User;
}
