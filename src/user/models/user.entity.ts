import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { bcrypt } from 'bcrypt';

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }

    /* @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hash(this.password);
    } */

}