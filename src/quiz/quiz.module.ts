import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { Document } from 'src/entities/document.entity';
import { QuestionReponse } from 'src/entities/question_response.entity';
import { Note_obtenue } from 'src/entities/note_obtenue.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Quiz, Document, QuestionReponse,Note_obtenue])],
  providers: [QuizService],
  controllers: [QuizController]
})
export class QuizModule {}
