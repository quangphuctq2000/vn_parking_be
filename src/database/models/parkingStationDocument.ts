import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ParkingStation } from './parkingStations';

@Entity()
export class ParkingStationDocument {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    documentId: string;

    @Column()
    documentName: string;

    @ManyToOne(
        () => ParkingStation,
        (parkingStation) => parkingStation.parkingStationDocuments,
    )
    parkingStation: ParkingStation;
}
