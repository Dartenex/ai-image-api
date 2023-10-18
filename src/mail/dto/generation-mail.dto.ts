import { GeneratedImageDto } from '@generator/dto';

export interface GenerationMailDto {
  email: string;
  images: GeneratedImageDto[];
}
