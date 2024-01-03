import { Injectable, Logger } from '@nestjs/common';
import { TNL, TNLTypes } from 'tnl-midjourney-api';
import { delayCallback, generateHash } from '@utils';
import Message = TNLTypes.Response.Message;
import { ImageGeneratorInterface } from '@generator/contracts';
import MessageAndProgress = TNLTypes.Response.MessageAndProgress;
import { GeneratedImageDto } from '@generator/dto';
import { MidjourneyClientFactory } from '@generator/drivers/midjourney/midjourney.client-factory';

@Injectable()
export class MidjourneyService implements ImageGeneratorInterface {
  private readonly logger: Logger = new Logger(MidjourneyService.name);
  private readonly maxAttempts: number = 3;

  public constructor(
    private readonly midjourneyClientFactory: MidjourneyClientFactory,
  ) {}

  public async generateImagesByQuery(
    query: string,
  ): Promise<GeneratedImageDto[]> {
    const client: TNL = await this.midjourneyClientFactory.createClient();
    let currentAttempt = 0;
    let success = false;
    let response: MessageAndProgress;
    const params = '--ar 4:3';
    this.logger.log(`Started generating images with query '${query}'`);
    do {
      try {
        const msgIdResponse: Message = await delayCallback(1000, async () => {
          return await client.imagine(`${query} ${params}`);
        });
        const messageId: string = msgIdResponse.messageId;
        if (!messageId) {
          this.logger.error('No message id was provided!');
          return [];
        }
        await delayCallback(10000, async () => {
          response = await client.getMessageAndProgress(messageId);
        });
        if (response.progress === 100 && response?.response) {
          return this.processResponse(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (response?.response?.imageUrls as string[]) || [],
            response.response.originatingMessageId,
            response.response.responseAt,
          );
        }
        do {
          await delayCallback(10000, async () => {
            response = await client.getMessageAndProgress(messageId);
          });
        } while (response.progress < 100);
        success = true;
        this.logger.log(`Finished generating images with query '${query}'`);
      } catch (e) {
        console.log(e);
        this.logger.error(`Failed generating images with query '${query}'`);
        this.logger.log(e);
        success = false;
        currentAttempt += 1;
      }
    } while (currentAttempt !== this.maxAttempts && !success);
    if (!response) {
      return [];
    }
    return this.processResponse(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (response?.response?.imageUrls as string[]) || [],
      response.response.originatingMessageId,
      response.response.responseAt,
    );
  }

  private processResponse(
    imgUrls: string[],
    messageId: string,
    createdAt: string,
  ): GeneratedImageDto[] {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const items: string[] = imgUrls;
    if (!items.length) {
      return [];
    }
    return items.map((url: string) => ({
      id: generateHash(`${messageId}${url}`),
      isUpscaled: true,
      source: 'midjourney',
      url: url,
      createdAt: createdAt,
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
