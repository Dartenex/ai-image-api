import { IsNotEmpty, IsString } from 'class-validator';

export class GetGenerationsByUserIdReqInDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
