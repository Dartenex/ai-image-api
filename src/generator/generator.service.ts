import { Inject, Injectable } from '@nestjs/common';
import { OpenAiService } from '@open-ai/open-ai.service';
import { ImageToSave, MainGeneratorDto, ResultImage } from '@generator/dto';
import { InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { MailService } from '../mail/mail.service';
import { StorageService } from '../storage/storage.service';
import { delayCallback, generateHash, logTime } from '@utils';
import {
  GeneratorDIKeys,
  ImageRepositoryInterface,
} from '@generator/contracts';
import { LeonardoAiService, MidjourneyService } from '@generator/drivers';
import { QueueKeys } from '@generator/queue.keys';

@Injectable()
export class GeneratorService {
  public constructor(
    private textGenerator: OpenAiService,
    private midjourneyAi: MidjourneyService,
    private leonardoAi: LeonardoAiService,
    @InjectQueue(QueueKeys.MAIN_QUEUE) private generatorQueue: Queue,
    private mailService: MailService,
    private storageService: StorageService,
    @Inject(GeneratorDIKeys.ImageRepository)
    private readonly imageRepository: ImageRepositoryInterface,
  ) {}

  public async processQueueItem(job: Job<MainGeneratorDto>) {
    const requestId = generateHash(job.data);
    const start = new Date();
    console.log(
      `[${start.toISOString()}]: Generation started for request ${requestId} and email ${
        job.data.user.email
      }`,
    );
    await this.mailService.sendGreetingsMessage(
      job.data.user.email,
      job.data.query,
    );
    const images: ResultImage[] = await this.generateMainImages(job.data);
    await this.saveImages(images, job.data, requestId);
    await this.sendMessageToUser(job.data, requestId);
    const end = new Date();
    console.log(
      `[${end.toISOString()}]: Generation finished for request ${requestId} and email ${
        job.data.user.email
      }`,
    );
  }

  private async saveImages(
    images: ResultImage[],
    dto: MainGeneratorDto,
    requestId: string,
  ) {
    const resultImages: ImageToSave[] = images.map((i: ResultImage) => {
      const extension = this.getExtension(i.url);

      return {
        ...i,
        email: dto.user.email,
        name: `${generateHash(i.url)}.${extension}`,
        requestId: requestId,
      };
    });
    for (const image of resultImages) {
      await this.storageService.downloadAndSave(image.url, image.name);
    }
    await this.imageRepository.saveMultipleImages(resultImages);
  }

  public async dispatchGenerationJob(dto: MainGeneratorDto) {
    await this.generatorQueue.add(dto);
    console.log(
      `${logTime()}Dispatched job for user '${dto.user.email}' with query '${
        dto.query
      }'`,
    );
  }

  public async generateMainImages(dto: MainGeneratorDto) {
    const textPrompts = await this.textGenerator.generatePromptsForImages(
      dto.query,
    );
    const midjourneyImages =
      (await this.midjourneyAi.getImagesByQueries(textPrompts)) ?? [];
    const leonardoResult = await this.leonardoAi.generateByQueries(textPrompts);
    const leonardoUpscaledImages: ResultImage[] =
      await this.leonardoAi.upscaleImages(leonardoResult);

    const allImages: ResultImage[] = [...leonardoUpscaledImages];
    midjourneyImages.forEach((images: any[]) => {
      const imgsToProcess = images ?? [];
      const imgs = imgsToProcess.map(
        (i: string): ResultImage => ({
          url: i,
          isUpscaled: false,
          source: 'midjourney',
          createdAt: new Date().toISOString(),
        }),
      );
      allImages.push(...imgs);
    });
    return allImages;
  }

  public async getRandomPics(amount: number): Promise<string[]> {
    const names = await this.imageRepository.getRandomPicsUrls(amount);
    return names.map((name: string) => this.getImgUrlByName(name));
  }

  public async upscaleImage(url: string): Promise<string> {
    await delayCallback(2345, () => 1);
    return url;
  }

  private async sendMessageToUser(dto: MainGeneratorDto, requestId: string) {
    const requestImages = await this.imageRepository.getImagesByRequestId(
      requestId,
    );
    await this.mailService.sendGenerationMail({
      images: requestImages,
      email: dto.user.email,
    });
  }

  private getImgUrlByName(name: string): string {
    return `https://gio-ai-api-bucket.s3.amazonaws.com/images/${name}`;
  }

  private getExtension(link: string): string {
    const regExp = new RegExp(/\.(?<extension>(png|jpg|jpeg)$)/);
    return link.match(regExp).groups.extension;
  }
}
