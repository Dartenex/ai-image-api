import { GeneratedImageDto } from '@generator/dto/generated-image.dto';

export { MainGeneratorDto } from './main.dto';
export { GenerateUserDto } from './generate-user.dto';
export { GenerateReqInDto } from './generate.req-in.dto';
export { GetImagesByUserIdReqInDto } from './get-images-by-user-id.req-in.dto';
export { GeneratedImageDto } from './generated-image.dto';

export class ImageToSave extends GeneratedImageDto {
  name: string;
  email: string;
  requestId: string;
  userId: string;
}

export * from './responses';
