import { ApiProperty } from '@nestjs/swagger';

export class GenerationDto {
  @ApiProperty({
    type: String,
  })
  id: string;
  @ApiProperty({
    type: String,
  })
  prompt: string;
  @ApiProperty({
    type: Number,
  })
  progressInPercents: number;
  @ApiProperty({
    type: String,
  })
  createdAt: string;
  @ApiProperty({
    type: String,
  })
  userId: string;
}
