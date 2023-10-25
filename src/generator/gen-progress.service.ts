import { Inject, Injectable } from '@nestjs/common';
import {
  GenerationRepositoryInterface,
  GeneratorDIKeys,
} from '@generator/contracts';
import { CurrentProgressDto } from '@generator/dto';

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

  public async increment(requestId: string, incVal: number): Promise<void> {
    const currentProgress: CurrentProgressDto = await this.getProgress(
      requestId,
    );
    await this.update(requestId, currentProgress.currentProgress + incVal);
  }

  public async init(
    userId: string,
    requestId: string,
    prompt: string,
  ): Promise<void> {
    await this.generationRepository.create({
      userId: userId,
      prompt: prompt,
      progressInPercents: 0,
      createdAt: new Date().toISOString(),
      id: requestId,
    });
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
