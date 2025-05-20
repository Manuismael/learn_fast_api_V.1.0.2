import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Resumes } from './resumes.entity';

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

  @ManyToOne(() => Resumes)
  @JoinColumn({ name: 'Id_resum' })
  resum: Resumes;
}
