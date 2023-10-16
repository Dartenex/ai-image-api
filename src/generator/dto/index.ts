export { MainGeneratorDto } from './main.dto';
export { GenerateUserDto } from './generate-user.dto';
export { GenerateReqInDto } from './generate.req-in.dto';
export { GetImagesByUserIdReqInDto } from './get-images-by-user-id.req-in.dto';

export interface ResultImage {
  url: string;
  source: 'midjourney' | 'leonardo';
  createdAt: string;
  isUpscaled: boolean;
}

export interface ImageToSave extends ResultImage {
  name: string;
  email: string;
  requestId: string;
}

export * from './responses';
