import { Module } from '@nestjs/common';
import { MidjourneyService } from './midjourney.service';

@Module({
  providers: [MidjourneyService],
  exports: [MidjourneyService],
})
export class MidjourneyModule {}
