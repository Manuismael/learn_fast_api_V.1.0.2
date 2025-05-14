import { Controller, Get, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
    constructor(private quizService:QuizService){}

    @Get('/getpath/:id_docs/:id_user')
    getDocumentPath(@Param('id_docs')id_docs:number, @Param('id_user')id_user:number){
       return this.quizService.prepareQuiz(id_docs, id_user);
    }

}
