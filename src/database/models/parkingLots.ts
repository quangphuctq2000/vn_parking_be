import { ParkingLotType } from '@/ultis/parkingLot';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ParkingStation } from './parkingStations';

@Entity()
export class ParkingLot {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: ParkingLotType,
    })
    type: ParkingLotType;

    @Column()
    pricePerHour: number;

    @Column()
    pricePerMonth: number;

    @Column({
        type: 'int',
        default: 0,
    })
    number: number;

    @Column({
        type: 'int',
        default: 0,
    })
    freeLot: number;

    // @ManyToOne(
    //     () => ParkingStation,
    //     (parkingStation) => parkingStation.parkingLots,
    // )
    parkingStation: ParkingStation;
}
