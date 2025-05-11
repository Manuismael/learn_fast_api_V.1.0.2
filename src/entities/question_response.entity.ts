import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QuestionReponse {
  @PrimaryGeneratedColumn()
  Id_qr: number;

  @Column()
  path_json: string;

  @Column()
  Id_quiz: number;
}
