import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpscaleReqInDto {
  @IsNotEmpty({
    message: 'imgUrl field is required',
  })
  @IsString({
    message: 'imgUrl field is required',
  })
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @Matches(/https:\/\/.+/gi, {
    message: 'imgUrl must be https',
  })
  imgUrl: string;
}
