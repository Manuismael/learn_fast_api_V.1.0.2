import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from 'src/entities/document.entity';
import { AiModelService } from 'src/ai_model/ai_model.service';
import { SummaryService } from 'src/summary/summary.service';
import { Resumes } from 'src/entities/resumes.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Document, Resumes])],
  providers: [FileService, AiModelService, SummaryService],
  controllers: [FileController]
})
export class FileModule {}
