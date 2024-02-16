import {
   Column,
   Entity,
   JoinTable,
   ManyToMany,
   OneToMany,
   PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { Board } from "./Board";
import { Task } from "./Task";

@Entity("USER")
export class User {
   @PrimaryGeneratedColumn()
   user_id?: number;

   @Column({ unique: true })
   username!: string;

   @Column()
   password_hash!: string;

   @Column({ unique: true })
   email!: string;

   @ManyToMany(() => Role, (role) => role.users)
   @JoinTable({
      name: "USER_ROLE",
      joinColumn: {
         name: "USER_ID",
         referencedColumnName: "user_id",
      },
      inverseJoinColumn: {
         name: "ROLE_ID",
         referencedColumnName: "role_id",
      },
   })
   roles!: Role[];

   @JoinTable({
      name: "USER_BOARD",
      joinColumn: {
         name: "USER_ID",
         referencedColumnName: "user_id",
      },
      inverseJoinColumn: {
         name: "BOARD_ID",
         referencedColumnName: "board_id",
      },
   })
   
   @ManyToMany(() => Board, (board) => board.users )
   boards?: Board[]

   @OneToMany(() => Task, (task) => task.user)
   tasks?: Task[]

   @OneToMany(() => Board, (board) => board.owner)
   ownerBoards?: Board[]
}
