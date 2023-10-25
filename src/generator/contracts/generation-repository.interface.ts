import { GenerationDto, GenerationsByUserIdRepoInDto } from '@generator/dto';

export interface GenerationRepositoryInterface {
  create(data: GenerationDto): Promise<string>;
  updateProgress(id: string, progressInPercents: number): Promise<void>;
  generationsByUserId(
    data: GenerationsByUserIdRepoInDto,
  ): Promise<GenerationDto[]>;
}
