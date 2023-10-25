import { ApiProperty } from '@nestjs/swagger';
import { GenerationDto } from '@generator/dto/generation.dto';

export class GenerationsByUserIdServiceOutDto {
  @ApiProperty({
    type: [GenerationDto],
  })
  generations: GenerationDto[];
}
