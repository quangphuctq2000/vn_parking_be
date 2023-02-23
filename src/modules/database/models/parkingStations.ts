import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ParkingStations {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @Column()
  longitutude: number;

  @Column()
  latitude: number;
}
