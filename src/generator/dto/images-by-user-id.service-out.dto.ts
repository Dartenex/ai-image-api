import { ApiProperty } from '@nestjs/swagger';
import { PublicImage } from '@generator/dto/public-image.dto';

export class ImagesByUserIdServiceOutDto {
  @ApiProperty({
    type: [PublicImage],
  })
  images: PublicImage[];
}
