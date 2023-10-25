export { ImageGeneratorInterface } from './image-generator.interface';
export { ImageRepositoryInterface } from './image-repository.interface';
export { GenerationRepositoryInterface } from './generation-repository.interface';

export enum GeneratorDIKeys {
  ImageRepository = 'ImageRepositoryInterface',
  GenerationRepository = 'GenerationRepositoryInterface',
}
