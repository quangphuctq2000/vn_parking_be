import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class RevokeTokens {
  @PrimaryColumn()
  id: string;

  @Column()
  token: string;
}
