import {
   Column,
   CreateDateColumn,
   DeleteDateColumn,
   Entity,
   JoinColumn,
   ManyToMany,
   ManyToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { TaskStatus } from "../constants/TaskStatus";
import { Board } from "./Board";

@Entity("TASK")
export class Task {
   @PrimaryGeneratedColumn()
   task_id!: number;

   @Column()
   title!: string;

   @Column()
   text?: string;

   @Column()
   priority!: number;

   @Column({
      type: 'enum',
      enum: TaskStatus,
      default: TaskStatus.TODO,
    })
    status!: String;

   @CreateDateColumn({
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP(6)"
  })
  created_at!: Date;

  @UpdateDateColumn({
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP(6)",
      onUpdate: "CURRENT_TIMESTAMP(6)"
  })
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at?: Date; 
   
   @ManyToOne(() => User, (user) => user.tasks)
   @JoinColumn({ name: "user_id" })
   user?: User
   
   @ManyToOne(() => Board, (board) => board.tasks)
   @JoinColumn({ name: "board_id" })
   board!: Board
}
