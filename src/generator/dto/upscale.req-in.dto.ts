import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpscaleReqInDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  imgId: string;
}
