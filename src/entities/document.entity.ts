import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Resumes } from "./resumes.entity";

@Entity()
export class Document{
    @PrimaryGeneratedColumn()
    Id_docs: number;

    @Column()
    path: string;

    @Column()
    date_upload: Date;

    @Column()
    Id_user: number;

    //@OneToMany(() => Historic, historic => historic.document)
    //historics: Historic[];
}