import { Inject, Injectable } from '@nestjs/common';
import {
  UpscaleResDto,
  UpscalingDriverInterface,
  UpscalingInjectKeys,
} from './contracts';

@Injectable()
export class UpscalingService {
  public constructor(
    @Inject(UpscalingInjectKeys.UPSCALING_DRIVER)
    private readonly upscalingDriver: UpscalingDriverInterface,
  ) {}

  public async upscaleImage(imageUrl: string): Promise<UpscaleResDto> {
    return await this.upscalingDriver.upscale(imageUrl);
  }
}
