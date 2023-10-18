import { GeneratedImageDto } from '@generator/dto';

export interface ImageGeneratorInterface {
  generateImagesByQuery(query: string): Promise<GeneratedImageDto[]>;
  generateImagesByQueries(queries: string[]): Promise<GeneratedImageDto[]>;
}
