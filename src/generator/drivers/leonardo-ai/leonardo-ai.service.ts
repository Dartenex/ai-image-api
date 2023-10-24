import { Injectable, Logger } from '@nestjs/common';
import * as sdk from 'api';
import { ConfigService } from '@nestjs/config';
import { delayCallback } from '@utils';
import { LeonardoImage, LeonardoUpscaledImage } from './dto';
import { GeneratedImageDto } from '@generator/dto';
import { ImageGeneratorInterface } from '@generator/contracts';
import {
  CreateGenerationResponse200,
  CreateVariationUpscaleResponse200,
  GetGenerationByIdResponse200,
  GetVariationByIdResponse200,
} from '../../../../.api/apis/leonardoai';
import { FetchResponse } from 'api/dist/core';

@Injectable()
export class LeonardoAiService implements ImageGeneratorInterface {
  private sdk: any;
  private readonly modelId: string;
  private readonly logger: Logger = new Logger(LeonardoAiService.name);

  public constructor(private config: ConfigService) {
    this.modelId = this.config.get<string>('LEONARDO_AI_MODEL_ID');
    const apiKey = this.config.get<string>('LEONARDO_AI_API_KEY');
    if (!apiKey || !this.modelId) {
      throw new Error('Leonardo AI credentials not set!');
    }
    this.sdk = sdk('@leonardoai/v1.0#28807z41owlgnis8jg');
    this.sdk.auth(this.config.get<string>('LEONARDO_AI_API_KEY'));
  }

  public async generateImagesByQuery(
    query: string,
  ): Promise<GeneratedImageDto[]> {
    let success = true;
    let attempts = 3;
    let images: LeonardoImage[] = [];
    do {
      try {
        this.logger.log(`Started generating images - attempt = ${attempts}`);
        const response: FetchResponse<any, CreateGenerationResponse200> =
          await this.sdk.createGeneration({
            prompt: query,
            modelId: this.modelId,
          });
        const genId: string = response.data.sdGenerationJob.generationId;
        images = await this.getResult(genId);
        this.logger.log(`Finished generating images - attempt = ${attempts}`);
      } catch (e) {
        this.logger.log(`Failed generating images - attempt = ${attempts}`);
        this.logger.error(e?.data, e);
        success = false;
        attempts -= 1;
      }
    } while (!success && attempts !== 0);

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
    let result: FetchResponse<any, GetGenerationByIdResponse200> =
      await this.sdk.getGenerationById({
        id: generationId,
      });
    do {
      result = await delayCallback(10000, async () => {
        return await this.sdk.getGenerationById({
          id: generationId,
        });
      });
    } while (result.data.generations_by_pk.status !== 'COMPLETE');
    return result.data.generations_by_pk.generated_images as LeonardoImage[];
  }

  private async upscaleById(
    id: string,
  ): Promise<CreateVariationUpscaleResponse200> {
    const response: FetchResponse<any, CreateVariationUpscaleResponse200> =
      await this.sdk.createVariationUpscale({ id: id });
    return response.data;
  }

  public async upscaleImages(
    images: GeneratedImageDto[],
  ): Promise<GeneratedImageDto[]> {
    const result: LeonardoUpscaledImage[] = [];
    for (const image of images) {
      const upscaleResponse: CreateVariationUpscaleResponse200 =
        await this.upscaleById(image.id);
      const upscaleId: string = upscaleResponse.sdUpscaleJob.id;
      const response: GetVariationByIdResponse200 =
        await this.getUpscaleResultById(upscaleId);
      const images: LeonardoUpscaledImage[] =
        response.generated_image_variation_generic as LeonardoUpscaledImage[];
      result.push(...images);
    }
    return this.processUpscaledImages(result);
  }

  private async getUpscaleResultById(
    id: string,
  ): Promise<GetVariationByIdResponse200> {
    let result: FetchResponse<any, GetVariationByIdResponse200> = null;
    let completedImages = [];
    do {
      result = await delayCallback(10000, async () => {
        return await this.sdk.getVariationById({ id });
      });
      const responseItems: LeonardoUpscaledImage[] = result.data
        .generated_image_variation_generic as LeonardoUpscaledImage[];
      completedImages = responseItems.filter(
        (image: LeonardoUpscaledImage) => image.status !== 'PENDING',
      );
    } while (completedImages.length === 0);
    return result.data;
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

  private processUpscaledImages(
    images: LeonardoUpscaledImage[],
  ): GeneratedImageDto[] {
    return images.map((i: LeonardoUpscaledImage) => ({
      isUpscaled: true,
      source: 'leonardo',
      createdAt: new Date(i.createdAt).toISOString(),
      url: i.url,
      id: i.id,
    }));
  }
}
