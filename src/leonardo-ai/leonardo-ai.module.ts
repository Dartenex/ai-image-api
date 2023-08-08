import { Module } from '@nestjs/common';
import { LeonardoAiService } from './leonardo-ai.service';

@Module({
  providers: [LeonardoAiService],
  exports: [LeonardoAiService],
})
export class LeonardoAiModule {}
