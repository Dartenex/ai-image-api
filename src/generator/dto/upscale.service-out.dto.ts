import { ApiProperty } from '@nestjs/swagger';

export class UpscaleServiceOutDto {
  @ApiProperty({
    type: 'string',
  })
  imgUrl: string;
}
