import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TNL, TNLTypes } from 'tnl-midjourney-api';
import { delayCallback, generateHash } from '@utils';
import Message = TNLTypes.Response.Message;
import { ImageGeneratorInterface } from '@generator/contracts';
import MessageAndProgress = TNLTypes.Response.MessageAndProgress;
import { GeneratedImageDto } from '@generator/dto';

@Injectable()
export class MidjourneyService implements ImageGeneratorInterface {
  private client: TNL;
  private readonly logger = new Logger(MidjourneyService.name);

  public constructor(private configService: ConfigService) {
    const key = this.configService.get<string>('MIDJOURNEY_API_KEY');
    if (!key) {
      throw new Error('Midjourney API KEY was not set!');
    }
    this.client = new TNL(key);
  }

  public async generateImagesByQuery(
    query: string,
  ): Promise<GeneratedImageDto[]> {
    let attempts = 2;
    let success = false;
    let response: MessageAndProgress;
    do {
      try {
        const msgIdResponse: Message = await delayCallback(1000, async () => {
          return await this.client.imagine(query);
        });
        const messageId: string = msgIdResponse.messageId;
        if (!messageId) {
          this.logger.error('No message id was provided!');
          return [];
        }
        await delayCallback(10000, async () => {
          response = await this.client.getMessageAndProgress(messageId);
        });
        if (response.progress === 100) {
          return this.processResponse(response);
        }
        do {
          await delayCallback(10000, async () => {
            response = await this.client.getMessageAndProgress(messageId);
          });
        } while (response.progress < 100);
        success = true;
      } catch (e) {
        success = false;
        attempts -= 1;
      }
    } while (attempts !== 0 && !success);

    return this.processResponse(response);
  }

  private processResponse(response: MessageAndProgress): GeneratedImageDto[] {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const items: string[] = (response.response?.imageUrls as string[]) ?? [];
    if (!items.length) {
      return [];
    }
    return items.map((url: string) => ({
      id: generateHash(`${response.response.originatingMessageId}${url}`),
      isUpscaled: true,
      source: 'midjourney',
      url: url,
      createdAt: response.response.responseAt,
    }));
  }

  public async generateImagesByQueries(
    queries: string[],
  ): Promise<GeneratedImageDto[]> {
    const images: GeneratedImageDto[] = [];
    for (const query of queries) {
      const result: GeneratedImageDto[] = await delayCallback(
        10000,
        async () => await this.generateImagesByQuery(query),
      );
      images.push(...result);
    }
    return images;
  }
}
