import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resumes } from 'src/entities/resumes.entity';
import { AiModelService } from 'src/ai_model/ai_model.service';

@Module({
  imports:[TypeOrmModule.forFeature([Resumes])],
  providers: [SummaryService, AiModelService],
  controllers: [SummaryController]
})
export class SummaryModule {}
