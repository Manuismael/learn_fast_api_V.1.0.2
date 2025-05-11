import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from 'src/entities/document.entity';
import { QuestionReponse } from 'src/entities/question_response.entity';
import { Quiz } from 'src/entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private quizRepository:Repository<Quiz>,
        @InjectRepository(Document)
        private docRepository:Repository<Document>,
        @InjectRepository(QuestionReponse)
        private qrRepository:Repository<QuestionReponse>,
    ){}

    async createQuiz(quiz:any){
        return this.quizRepository.save(quiz)
    }

    //recupérer les informations du document choisi et du resumé associer
    async 
}
