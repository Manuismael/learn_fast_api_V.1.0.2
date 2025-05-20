import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
    constructor(private quizService:QuizService){}

    @Get('/getpath/:id_docs/:id_user')
    prepareQuiz(@Param('id_docs')id_docs:number, @Param('id_user')id_user:number){
       return this.quizService.prepareQuiz(id_docs, id_user);
    }

    @Get('/flashcard/:id_docs/:id_user')
    prepareFlashcard(@Param('id_docs')id_docs:number, @Param('id_user')id_user:number){
       return this.quizService.prepareFlashcards(id_docs, id_user);
    }

    @Post('notequiz')
    noteQuiz(@Body() note:any){
        return this.quizService.notes(note);
    }

    @Get('statquiz/:id_user')
    statQuiz(@Param('id_user')id_user:number){
        return this.quizService.quizStat(id_user);
    }
}
