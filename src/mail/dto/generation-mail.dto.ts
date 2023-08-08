import { ResultImage } from '@generator/dto';

export interface GenerationMailDto {
  email: string;
  images: ResultImage[];
}
