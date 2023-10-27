import { GeneratedImageDto } from '@generator/dto/generated-image.dto';

export { MainGeneratorDto } from './main.dto';
export { GenerateUserDto } from './generate-user.dto';
export { GenerateReqInDto } from './generate.req-in.dto';
export { GetImagesByUserIdReqInDto } from './get-images-by-user-id.req-in.dto';
export { GeneratedImageDto } from './generated-image.dto';
export { ImagesByUserIdServiceOutDto } from './images-by-user-id.service-out.dto';
export { ImagesByUserIdServiceInDto } from './images-by-user-id.service-in.dto';
export { ImagesByUserIdRepoInDto } from './images-by-user-id.repo-in.dto';
export { GeneratorMainResDto } from './generator-main.res.dto';
export { PublicImage } from './public-image.dto';
export { FinalGeneratedImageDto } from './final-generated-image.dto';
export { GenerationDto } from './generation.dto';
export { GenerationsByUserIdServiceInDto } from './generations-by-user-id.service-in.dto';
export { GenerationsByUserIdRepoInDto } from './generations-by-user-id.repo-in.dto';
export { GenerationsByUserIdServiceOutDto } from './generations-by-user-id.service-out.dto';
export { GetGenerationsByUserIdReqInDto } from './get-generations-by-user-id.req-in.dto';
export { CurrentProgressDto } from './current-progress.dto';
export { UpscaleServiceOutDto } from './upscale.service-out.dto';

export class ImageToSave extends GeneratedImageDto {
  name: string;
  email: string;
  requestId: string;
  userId: string;
  prompt: string;
}

export * from './responses';
