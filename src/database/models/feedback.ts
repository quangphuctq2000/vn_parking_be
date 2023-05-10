import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@database/models/users';
import { ParkingStation } from '@database/models/parkingStations';

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => User, (user) => user.feedbacks)
    user: User;

    @ManyToOne(
        () => ParkingStation,
        (parkingStation) => parkingStation.feedbacks,
    )
    parkingStation: ParkingStation;
}
