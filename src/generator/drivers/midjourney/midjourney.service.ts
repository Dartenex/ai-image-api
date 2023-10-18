import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TNL, TNLTypes } from 'tnl-midjourney-api';
import { delayCallback } from '@utils';
import Message = TNLTypes.Response.Message;
import { ImageGeneratorInterface } from '@generator/contracts';
import { GeneratedImageDto } from '@generator/dto';

@Injectable()
export class MidjourneyService implements ImageGeneratorInterface {
  private client: TNL;

  public constructor(private configService: ConfigService) {
    this.client = new TNL(this.configService.get<string>('MIDJOURNEY_API_KEY'));
  }

  async generateImageByQuery(query: string): Promise<GeneratedImageDto> {
    return {
      source: 'midjourney',
      isUpscaled: false,
      createdAt: '',
      url: '',
      query: query,
    };
  }

  public async generateImagesByQuery(query: string): Promise<string[]> {
    try {
      const msgIdResponse: Message = await delayCallback(1000, async () => {
        return await this.client.imagine(query);
      });
      const messageId = msgIdResponse.messageId;
      let response;
      await delayCallback(10000, async () => {
        response = await this.client.getMessageAndProgress(messageId);
      });
      if (!messageId) {
        console.log('NO MESSAGE ID');
        console.log(response);
        return [];
      }
      if (response.progress === 100) {
        console.log('PROGRESS IS 100');
        console.log(response);
        return response.response.imageUrls;
      }
      do {
        await delayCallback(10000, async () => {
          response = await this.client.getMessageAndProgress(messageId);
        });
        console.log(messageId, response);
      } while (response.progress < 100);
      return response.response.imageUrls;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  public async getImagesByQueries(queries: string[]): Promise<Array<string[]>> {
    const images = [];
    for (const query of queries) {
      const result = await delayCallback(
        10000,
        async () => await this.generateImagesByQuery(query),
      );
      images.push(result);
      console.log(`QUERY ${query} finished`);
    }
    console.log('getImagesByQueries', images);
    return images;
  }
}
