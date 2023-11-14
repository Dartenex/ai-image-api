import { UpscaleResDto } from './upscale.res.dto';

export { UpscaleResDto } from './upscale.res.dto';

export interface UpscalingDriverInterface {
  upscale(imageUrl: string): Promise<UpscaleResDto>;
}

export enum UpscalingInjectKeys {
  UPSCALING_DRIVER = 'UPSCALING_DRIVER',
}
