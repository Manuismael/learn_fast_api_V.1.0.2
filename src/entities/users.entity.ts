import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Resumes } from "./resumes.entity";

@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column()
    email: string;

    @Column()
    password: string;

    //@OneToMany(() => Historic, historic => historic.user)
    //historics: Historic[];
}