import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  Id_quiz: number;

  @Column()
  date: Date;

  @Column()
  Id_user: number;

  @Column()
  Id_resum: number;
}
