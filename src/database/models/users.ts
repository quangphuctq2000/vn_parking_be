import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ParkingStation } from './parkingStations';
import { Vehicle } from './vehicle';
import { Role } from '@/ultis/role';
import { Notification } from './notification';
import { Feedback } from '@database/models/feedback';

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

    @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
    vehicle: Vehicle;

    @OneToMany(() => Notification, (notification) => notification.id)
    notifications: Notification[];

    @OneToMany(() => Feedback, (feedback) => feedback.id)
    feedbacks: Feedback[];
}
