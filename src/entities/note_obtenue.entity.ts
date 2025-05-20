import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Quiz } from './quiz.entity';
import { Users } from './users.entity';

@Entity()
export class Note_obtenue {
  @PrimaryColumn()
  Id_user: number;

  @PrimaryColumn()
  Id_quiz: number;

  @Column()
  note: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'Id_user' })
  user: Users;

  @ManyToOne(() => Quiz)
  @JoinColumn({ name: 'Id_quiz' })
  quiz: Quiz;
}
