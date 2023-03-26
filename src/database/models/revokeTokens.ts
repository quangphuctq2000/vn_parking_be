import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class RevokeToken {
  @PrimaryColumn()
  id: string;

  @Column()
  token: string;
}
