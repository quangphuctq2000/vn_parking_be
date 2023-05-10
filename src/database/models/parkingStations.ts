import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users';
import { Parking } from './parking';
import { ParkingStationDocument } from './parkingStationDocument';
import { Feedback } from './feedback';
import { Booking } from './booking';

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

    @Column({ default: 'active' })
    state: string;

    @ManyToOne(() => User, (user) => user.parkingStations)
    user: User;

    @OneToMany(() => Parking, (parking) => parking.id)
    parkings: Parking[];

    @OneToMany(
        () => ParkingStationDocument,
        (parkingStationDocument) => parkingStationDocument.id,
    )
    parkingStationDocuments: ParkingStationDocument[];

    @OneToMany(() => Feedback, (feedback) => feedback.id)
    feedbacks: Feedback[];

    @OneToMany(() => Booking, (booking) => booking.id)
    bookings: Booking[];
}
