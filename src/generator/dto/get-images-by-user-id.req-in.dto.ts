import { IsNotEmpty, IsString } from 'class-validator';

export class GetImagesByUserIdReqInDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
