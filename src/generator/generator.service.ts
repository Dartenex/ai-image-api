import { Inject, Injectable, Logger } from '@nestjs/common';
import { OpenAiService } from '@open-ai/open-ai.service';
import {
  GeneratedImageDto,
  ImageToSave,
  MainGeneratorDto,
} from '@generator/dto';
import { InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { MailService } from '../mail/mail.service';
import { StorageService } from '../storage/storage.service';
import { delayCallback, generateHash } from '@utils';
import {
  GeneratorDIKeys,
  ImageGeneratorInterface,
  ImageRepositoryInterface,
} from '@generator/contracts';
import { LeonardoAiService, MidjourneyService } from '@generator/drivers';
import { QueueKeys } from '@generator/queue.keys';

@Injectable()
export class GeneratorService {
  private readonly logger = new Logger(GeneratorService.name);

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
    const { user, query } = job.data;
    this.logger.log(
      `Generation started for request '${requestId}' and email ${user.email}`,
    );
    await this.mailService.sendGreetingsMessage(user.email, query);
    this.logger.log(`Successfully greetings message to user ${user.email}`);
    const images: GeneratedImageDto[] = await this.generateMainImages(job.data);
    await this.saveImages(images, job.data, requestId);
    this.logger.log(
      `Successfully saved ${images.length} images for user - ${user.email} and request ${requestId}.`,
    );
    await this.sendFinalMailToUser(job.data, requestId);
    this.logger.log(
      `Successfully final message to user - ${user.email} and request ${requestId}.`,
    );
    this.logger.log(
      `Generation finished for request '${requestId}' and email ${user.email}`,
    );
  }

  private async saveImages(
    images: GeneratedImageDto[],
    dto: MainGeneratorDto,
    requestId: string,
  ) {
    const resultImages: ImageToSave[] = images.map((i: GeneratedImageDto) => {
      const extension = this.getExtension(i.url);

      return {
        ...i,
        email: dto.user.email,
        name: `${generateHash(i.url)}.${extension}`,
        requestId: requestId,
        userId: dto.user.id,
      };
    });
    for (const image of resultImages) {
      await this.storageService.downloadAndSave(image.url, image.name);
    }
    await this.imageRepository.saveMultipleImages(resultImages);
  }

  public async dispatchGenerationJob(dto: MainGeneratorDto) {
    await this.generatorQueue.add(dto);
    this.logger.log(
      `Dispatched job for user '${dto.user.email}' with query '${dto.query}'`,
    );
  }

  public async generateMainImages(dto: MainGeneratorDto) {
    const generationServices: ImageGeneratorInterface[] = [
      this.midjourneyAi,
      this.leonardoAi,
    ];
    const textPrompts: string[] =
      await this.textGenerator.generatePromptsForImages(dto.query);
    const resultImages: GeneratedImageDto[] = [];
    for (const generationService of generationServices) {
      const generationImages = await generationService.generateImagesByQueries(
        textPrompts,
      );
      resultImages.push(...generationImages);
    }
    return resultImages;
  }

  public async getRandomPics(amount: number): Promise<string[]> {
    const names = await this.imageRepository.getRandomPicsUrls(amount);
    return names.map((name: string) => this.getImgUrlByName(name));
  }

  public async upscaleImage(url: string): Promise<string> {
    await delayCallback(2345, () => 1);
    return url;
  }

  public async imagesListByUserId() {

  }

  private async sendFinalMailToUser(dto: MainGeneratorDto, requestId: string) {
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
