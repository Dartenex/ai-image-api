import { GeneratedImageDto } from '@generator/dto';

export interface ImageGeneratorInterface {
  generateImageByQuery(query: string): Promise<GeneratedImageDto>;
}
