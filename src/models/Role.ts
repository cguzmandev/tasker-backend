import {
   Column,
   Entity,
   JoinTable,
   ManyToMany,
   PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("ROLE")
export class Role {
   @PrimaryGeneratedColumn()
   role_id!: number;

   @Column({ unique: true })
   name!: string;

   @ManyToMany(() => User, (user) => user.roles)
   users?: User[];
}
