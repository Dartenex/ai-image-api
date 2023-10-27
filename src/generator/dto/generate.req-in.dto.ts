import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateReqInDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  prompt: string;
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Invalid email!',
  })
  @ApiProperty({
    type: 'string',
    required: true,
  })
  email: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  userId: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  redirectUrl: string;
}
