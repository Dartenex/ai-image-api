import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PicturesResponse {
  @ApiProperty({
    type: [String],
    description: 'Array of urls',
  })
  pictures: string[];
}

export class MainResponse {
  @ApiProperty({
    type: Boolean,
  })
  result: boolean;
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
  @IsString()
  @IsNotEmpty()
  url: string;
}

export class UpscaleImageResponse {
  @ApiProperty({
    type: String,
    required: true,
  })
  url: string;
}
