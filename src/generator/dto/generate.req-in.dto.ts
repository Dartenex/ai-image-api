import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateReqInDto {
  @IsNotEmpty()
  @IsString()
  prompt: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  userId: string;
}
