import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SummaryModule } from './summary/summary.module';
import { QuizModule } from './quiz/quiz.module';
import { FileModule } from './file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Resumes } from './entities/resumes.entity';
import { Document } from './entities/document.entity';
import { ConfigModule } from '@nestjs/config';
import { AiModelModule } from './ai_model/ai_model.module';
import { Quiz } from './entities/quiz.entity';
import { Note_obtenue } from './entities/note_obtenue.entity';
import { QuestionReponse } from './entities/question_response.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost', 
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'learn_fast',
      entities: [Users, Document, Resumes, Quiz, Note_obtenue, QuestionReponse],
      synchronize: false,
    }),
    AuthModule,
    SummaryModule,
    QuizModule,
    FileModule,
    AiModelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
