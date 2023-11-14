import { Module } from '@nestjs/common';
import { UpscalingInjectKeys } from '@upscaling/contracts';
import { DeepaiDriver } from '@upscaling/drivers';
import { UpscalingService } from '@upscaling/upscaling.service';

@Module({
  providers: [
    {
      provide: UpscalingInjectKeys.UPSCALING_DRIVER,
      useClass: DeepaiDriver,
    },
    UpscalingService,
  ],
  exports: [UpscalingService],
})
export class UpscalingModule {}
