import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Docs } from 'src/entities/file.entity';
import { AiModelService } from 'src/ai_model/ai_model.service';
import { SummaryService } from 'src/summary/summary.service';
import { Historic } from 'src/entities/historic.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Docs, Historic])],
  providers: [FileService, AiModelService, SummaryService],
  controllers: [FileController]
})
export class FileModule {}
