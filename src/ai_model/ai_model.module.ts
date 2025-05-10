import { Module } from '@nestjs/common';
import { AiModelService } from './ai_model.service';
import { AiModelController } from './ai_model.controller';

@Module({
  providers: [AiModelService],
  controllers: [AiModelController]
})
export class AiModelModule {}
