import { Inject, Injectable, Logger } from '@nestjs/common';
import { OpenAiService } from '@open-ai/open-ai.service';
import {
  GeneratedImageDto,
  ImagesByUserIdServiceOutDto,
  ImageToSave,
  MainGeneratorDto,
  PublicImage,
} from '@generator/dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { MailService } from '../mail/mail.service';
import { StorageService } from '../storage/storage.service';
import { delayCallback, generateHash, publicImgUrl } from '@utils';
import {
  GeneratorDIKeys,
  ImageGeneratorInterface,
  ImageRepositoryInterface,
} from '@generator/contracts';
import { LeonardoAiService, MidjourneyService } from '@generator/drivers';
import { QueueKeys } from '@generator/queue.keys';
import { ImagesByUserIdServiceInDto } from '@generator/dto/images-by-user-id.service-in.dto';

@Injectable()
export class GeneratorService {
  private readonly logger: Logger = new Logger(GeneratorService.name);

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

  public async processQueueItem(data: MainGeneratorDto): Promise<void> {
    const { user, query, requestId } = data;
    this.logger.log(
      `Generation started for request '${requestId}', email ${user.email} and query '${query}'`,
    );
    await this.mailService.sendGreetingsMessage(user.email, query);
    this.logger.log(`Successfully greetings message to user ${user.email}`);
    const images: GeneratedImageDto[] = await this.generateMainImages(data);
    await this.saveImages(images, data, requestId);
    this.logger.log(
      `Successfully saved ${images.length} images for user - ${user.email} and request ${requestId}.`,
    );
    await this.sendFinalMailToUser(data, requestId);
    this.logger.log(
      `Successfully final message to user - ${user.email} and request ${requestId}.`,
    );
    this.logger.log(
      `Generation finished for request '${requestId}', email ${user.email} and query '${query}'`,
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
      const generationImages: GeneratedImageDto[] = await generationService.generateImagesByQueries(
        textPrompts,
      );
      resultImages.push(...generationImages);
    }
    return resultImages;
  }

  public async getRandomPics(amount: number): Promise<string[]> {
    const names = await this.imageRepository.getRandomPicsUrls(amount);
    return names.map((name: string) => publicImgUrl(name));
  }

  public async upscaleImage(url: string): Promise<string> {
    await delayCallback(2345, () => 1);
    return url;
  }

  public async imagesListByUserId(
    dto: ImagesByUserIdServiceInDto,
  ): Promise<ImagesByUserIdServiceOutDto> {
    const resultItems: PublicImage[] =
      await this.imageRepository.imagesByUserId(dto);

    return { images: resultItems };
  }

  private async sendFinalMailToUser(dto: MainGeneratorDto, requestId: string) {
    const requestImages = await this.imageRepository.getImagesByRequestId(
      requestId,
    );
    await this.mailService.sendGenerationMail({
      images: requestImages,
      email: dto.user.email,
      redirectUrl: dto.redirectUrl,
    });
  }

  private getExtension(link: string): string {
    const regExp = new RegExp(/\.(?<extension>(png|jpg|jpeg)$)/);
    return link.match(regExp).groups.extension;
  }
}
