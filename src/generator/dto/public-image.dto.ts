import { ApiProperty } from '@nestjs/swagger';

export class PublicImage {
  @ApiProperty({
    type: String,
  })
  publicUrl: string;
  @ApiProperty({
    type: String,
  })
  userId: string;
  @ApiProperty({
    type: String,
  })
  id: string;
  @ApiProperty({
    type: String,
  })
  name: string;
  @ApiProperty({
    type: String,
  })
  requestId: string;
  @ApiProperty({
    type: String,
  })
  createdAt: string;
  @ApiProperty({
    type: Boolean,
  })
  isUpscaled: boolean;
  @ApiProperty({
    type: String,
  })
  prompt: string;
}
