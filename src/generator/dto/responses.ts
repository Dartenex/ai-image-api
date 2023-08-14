import { ApiProperty } from '@nestjs/swagger';

export class PicturesResponse {
  @ApiProperty({
    type: [String],
    description: 'Array of urls',
  })
  pictures: string[];
}

export class MainResponse {
  @ApiProperty({
    type: String,
  })
  result: string;
}

export class BadRequestResponse {
  @ApiProperty({
    type: String,
  })
  error: string;
}

export class UpscaleImageBody {
  @ApiProperty({
    type: String,
    required: true,
  })
  url: string;
}

export class UpscaleImageResponse {
  @ApiProperty({
    type: String,
    required: true,
  })
  url: string;
}
