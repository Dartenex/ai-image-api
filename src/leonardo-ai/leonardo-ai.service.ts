import { Injectable } from '@nestjs/common';
import * as sdk from 'api';
import { ConfigService } from '@nestjs/config';
import { delayCallback, randomMilliseconds } from '@utils';
import { LeonardoImage, UpscaleImage } from './dto';
import { ResultImage } from '@generator/dto';

@Injectable()
export class LeonardoAiService {
  private sdk: any;

  public constructor(private config: ConfigService) {
    this.sdk = sdk('@leonardoai/v1.0#28807z41owlgnis8jg');
    this.sdk.auth(this.config.get<string>('LEONARDO_AI_API_KEY'));
  }

  public async generateByQueries(queries: string[]) {
    const result = [];
    for (const query of queries) {
      const queryResult = await this.generateByQuery(query);
      result.push(...queryResult.generations_by_pk.generated_images);
    }
    return result;
  }

  public async generateByQuery(query: string) {
    // generation id e6939bae-f726-49f0-928e-deea65332100
    const response = await this.sdk.createGeneration({
      prompt: query,
      modelId: '6bef9f1b-29cb-40c7-b9df-32b51c1f67d3',
    });
    const genId = response.data.sdGenerationJob.generationId;
    return await this.getResult(genId);
  }

  public async getResult(generationId: string) {
    let result = await this.sdk.getGenerationById({
      id: generationId,
    });
    do {
      result = await delayCallback(1500, async () => {
        return await this.sdk.getGenerationById({
          id: generationId,
        });
      });
      console.log(generationId, result.data);
    } while (result.data.generations_by_pk.status !== 'COMPLETE');
    return result.data;
  }

  public async upscaleById(id: string) {
    return await this.sdk.createVariationUpscale({ id: id });
  }

  public async upscaleImages(images: LeonardoImage[]) {
    const result = [];
    for (const image of images) {
      const upscaleResponse = await this.upscaleById(image.id);
      const upscaleId = upscaleResponse.data.sdUpscaleJob.id;
      const response = await this.getUpscaleResultById(upscaleId);
      const images = response.data.generated_image_variation_generic;
      result.push(...images);
    }
    return this.processUpscaledImages(result);
  }

  public async getUpscaleResultById(id: string) {
    let result = null;
    let completedImages = [];
    do {
      result = await delayCallback(randomMilliseconds(), async () => {
        return await this.sdk.getVariationById({ id });
      });
      completedImages = result.data.generated_image_variation_generic.filter(
        (image: UpscaleImage) => image.status !== 'PENDING',
      );
    } while (completedImages.length === 0);
    return result;
  }

  private processUpscaledImages(images: UpscaleImage[]): ResultImage[] {
    return images.map((i: UpscaleImage) => ({
      isUpscaled: true,
      source: 'leonardo',
      createdAt: i.createdAt,
      url: i.url,
    }));
  }
}
