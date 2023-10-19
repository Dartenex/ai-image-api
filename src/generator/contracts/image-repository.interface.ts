import {
  GeneratedImageDto,
  ImagesByUserIdRepoInDto,
  ImageToSave,
  PublicImage,
} from '@generator/dto';

export interface ImageRepositoryInterface {
  getRandomPicsUrls(amount: number): Promise<string[]>;
  saveMultipleImages(images: ImageToSave[]): Promise<void>;
  getImagesByRequestId(requestId: string): Promise<GeneratedImageDto[]>;
  imagesByUserId(dto: ImagesByUserIdRepoInDto): Promise<PublicImage[]>;
}
