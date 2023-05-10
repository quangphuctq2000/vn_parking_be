import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    content: string

    @Column()
    state: boolean

    @Column()
    type: string

    @ManyToOne(() => User, user=> user.notifications)
    user: User

}