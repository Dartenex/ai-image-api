import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { delayCallback } from '@utils';
import { LeonardoImage } from './dto';
import { GeneratedImageDto } from '@generator/dto';
import { ImageGeneratorInterface } from '@generator/contracts';
import {
  CreateGenerationResponse200,
  GetGenerationByIdResponse200,
} from '@api/leonardoai';
import { FetchResponse } from 'api/dist/core';
import { LeonardoClientFactory } from '@generator/drivers/leonardo-ai/leonardo.client-factory';

@Injectable()
export class LeonardoAiService implements ImageGeneratorInterface {
  private readonly modelId: string;
  private readonly logger: Logger = new Logger(LeonardoAiService.name);
  private readonly maxAttempts: number = 3;

  public constructor(
    private config: ConfigService,
    private readonly leonardoAiFactory: LeonardoClientFactory,
  ) {
    this.modelId = this.config.get<string>('LEONARDO_AI_MODEL_ID');
    const apiKey = this.config.get<string>('DEFAULT_LEONARDO_AI_API_KEY');
    if (!apiKey || !this.modelId) {
      throw new Error('Leonardo AI credentials not set!');
    }
  }

  private generationConfig() {
    return {
      modelId: this.modelId,
      height: 768,
      width: 1024,
      alchemy: true,
      contrastRatio: 0.5,
      guidance_scale: 14,
      num_images: 4,
      nsfw: true,
      photoReal: false,
      public: false,
      promptMagic: true,
      promptMagicStrength: 0.5,
      promptMagicVersion: 'v3',
      presetStyle: 'LEONARDO',
    };
  }

  public async generateImagesByQuery(
    query: string,
  ): Promise<GeneratedImageDto[]> {
    const client = await this.leonardoAiFactory.createClient();
    let success = true;
    let currentAttempt = 0;
    let images: LeonardoImage[] = [];
    do {
      try {
        this.logger.log(
          `Started generating images - attempt = ${currentAttempt}`,
        );
        const response: FetchResponse<any, CreateGenerationResponse200> =
          await client.createGeneration({
            prompt: query,
            ...this.generationConfig(),
          });
        const genId: string = response.data.sdGenerationJob.generationId;
        images = await this.getResult(genId);
        this.logger.log(
          `Finished generating images - attempt = ${currentAttempt}`,
        );
      } catch (e) {
        this.logger.log(
          `Failed generating images - attempt = ${currentAttempt}`,
        );
        this.logger.error(e?.data, e);
        success = false;
        currentAttempt += 1;
      }
    } while (!success && currentAttempt !== this.maxAttempts);

    return this.processLeonardoImages(images);
  }

  public async generateImagesByQueries(
    queries: string[],
  ): Promise<GeneratedImageDto[]> {
    const resultImages: GeneratedImageDto[] = [];
    for (const query of queries) {
      const queryResult: GeneratedImageDto[] = await this.generateImagesByQuery(
        query,
      );
      resultImages.push(...queryResult);
    }
    this.logger.log(
      `Finished generating all images with amount of ${resultImages.length}`,
    );
    return resultImages;
  }

  public async getResult(generationId: string): Promise<LeonardoImage[]> {
    const client = await this.leonardoAiFactory.createClient();
    let result: FetchResponse<any, GetGenerationByIdResponse200> =
      await client.getGenerationById({
        id: generationId,
      });
    do {
      result = await delayCallback(10000, async () => {
        return await client.getGenerationById({
          id: generationId,
        });
      });
    } while (result.data.generations_by_pk.status !== 'COMPLETE');
    return result.data.generations_by_pk.generated_images as LeonardoImage[];
  }

  private processLeonardoImages(images: LeonardoImage[]): GeneratedImageDto[] {
    return images.map((i: LeonardoImage) => ({
      isUpscaled: false,
      source: 'leonardo',
      createdAt: new Date().toISOString(),
      url: i.url,
      id: i.id,
    }));
  }
}
