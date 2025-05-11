import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Document } from "./document.entity";

@Entity()
export class Resumes{

  @PrimaryGeneratedColumn()
  id_resum: number;

  @Column({ type: 'text' })
  libelle: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column()
  date: Date;

  @Column()
  Id_docs: number;

  /* @ManyToOne(() => Auth, user => user.id, { onDelete: 'CASCADE' })
  user: Auth;

  @ManyToOne(() => Docs, doc => doc.id_docs, { onDelete: 'CASCADE' })
  document: Docs; */
}