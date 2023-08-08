export { MainGeneratorDto } from './main.dto';
export { GenerateUserDto } from './generate-user.dto';

export interface ResultImage {
  url: string;
  source: 'midjourney' | 'leonardo';
  createdAt: string;
  isUpscaled: boolean;
}
