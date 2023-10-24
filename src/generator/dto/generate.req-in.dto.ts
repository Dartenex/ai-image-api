import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class GenerateReqInDto {
  @IsNotEmpty()
  @IsString()
  prompt: string;
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Invalid email!',
  })
  email: string;
  @IsNotEmpty()
  @IsString()
  userId: string;
  @IsNotEmpty()
  @IsString()
  redirectUrl: string;
}
