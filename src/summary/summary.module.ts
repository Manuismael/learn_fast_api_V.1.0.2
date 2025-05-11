import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resumes } from 'src/entities/resumes.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Resumes])],
  providers: [SummaryService],
  controllers: [SummaryController]
})
export class SummaryModule {}
