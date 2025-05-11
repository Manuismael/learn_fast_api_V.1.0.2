import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Note_obtenue {
  @PrimaryColumn()
  Id_user: number;

  @PrimaryColumn()
  Id_quiz: number;

  @Column()
  note: number;
}
