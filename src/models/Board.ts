import {
   Column,
   Entity,
   JoinColumn,
   ManyToMany,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Task } from "./Task";

@Entity("BOARD")
export class Board {
   @PrimaryGeneratedColumn()
   board_id!: number;

   @Column()
   title!: string;
  
   @ManyToOne(() => User, (user) => user.ownerBoards)
   @JoinColumn({ name: "OWNER_USER_ID" })
   owner!: User

   @ManyToMany(() => User, (user) => user.boards)
   users!: User[]

   @OneToMany(() => Task, (task) => task.board)
   tasks?: Task[]
}
