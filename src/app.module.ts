import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SummaryModule } from './summary/summary.module';
import { QuizModule } from './quiz/quiz.module';
import { FileModule } from './file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auths.entity';
import { Historic } from './entities/historic.entity';
import { Docs } from './entities/file.entity';
import { ConfigModule } from '@nestjs/config';
import { AiModelModule } from './ai_model/ai_model.module';

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
      database: process.env.DB_NAME || 'ihsane',
      entities: [Auth, Docs, Historic],
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
