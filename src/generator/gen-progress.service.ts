import { Inject, Injectable } from '@nestjs/common';
import {
  GenerationRepositoryInterface,
  GeneratorDIKeys,
} from '@generator/contracts';
import { CurrentProgressDto, GenerationDto } from '@generator/dto';

@Injectable()
export class GenProgressService {
  public constructor(
    @Inject(GeneratorDIKeys.GenerationRepository)
    private readonly generationRepository: GenerationRepositoryInterface,
  ) {}

  public async getProgress(requestId: string): Promise<CurrentProgressDto> {
    const progressPercents: number =
      await this.generationRepository.getProgress(requestId);
    return {
      currentProgress: progressPercents,
      progressLeft: 100 - progressPercents,
    };
  }

  public async increment(requestId: string, incVal: number): Promise<number> {
    const currentProgress: CurrentProgressDto = await this.getProgress(
      requestId,
    );
    const newProgressValue: number = currentProgress.currentProgress + incVal;
    await this.update(requestId, newProgressValue);
    return newProgressValue;
  }

  public async init(
    userId: string,
    requestId: string,
    prompt: string,
  ): Promise<GenerationDto> {
    const data: GenerationDto = {
      userId: userId,
      prompt: prompt,
      progressInPercents: 0,
      createdAt: new Date().toISOString(),
      id: requestId,
    };
    await this.generationRepository.create(data);
    return data;
  }

  public async update(
    requestId: string,
    progressInPercents: number,
  ): Promise<void> {
    const newValue: number =
      Math.ceil(progressInPercents) >= 100
        ? 100
        : Math.ceil(progressInPercents);
    await this.generationRepository.updateProgress(requestId, newValue);
  }
}
