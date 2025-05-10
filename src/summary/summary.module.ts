import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historic } from 'src/entities/historic.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Historic])],
  providers: [SummaryService],
  controllers: [SummaryController]
})
export class SummaryModule {}
