import { Inject, Injectable, Logger } from '@nestjs/common';
import { OpenAiService } from '@open-ai/open-ai.service';
import {
  CurrentProgressDto,
  FinalGeneratedImageDto,
  GeneratedImageDto,
  GenerationDto,
  GenerationsByUserIdServiceInDto,
  GenerationsByUserIdServiceOutDto,
  ImagesByUserIdServiceOutDto,
  ImageToSave,
  MainGeneratorDto,
  PublicImage,
  UpscaleServiceInDto,
} from '@generator/dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { MailService } from '@mail/mail.service';
import { StorageService } from '@storage/storage.service';
import { generateHash, publicImgUrl } from '@utils';
import {
  GenerationRepositoryInterface,
  GeneratorDIKeys,
  ImageGeneratorInterface,
  ImageRepositoryInterface,
} from '@generator/contracts';
import { LeonardoAiService, MidjourneyService } from '@generator/drivers';
import { QueueKeys } from '@generator/queue.keys';
import { ImagesByUserIdServiceInDto } from '@generator/dto/images-by-user-id.service-in.dto';
import { GenProgressService } from '@generator/gen-progress.service';
import { UpscalingService } from '@upscaling/upscaling.service';
import { UpscaleResDto } from '@upscaling/contracts';

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
    @Inject(GeneratorDIKeys.GenerationRepository)
    private readonly generationRepository: GenerationRepositoryInterface,
    private readonly generationProgressService: GenProgressService,
    private readonly upscalingService: UpscalingService,
  ) {}

  public async upscaleImage(data: UpscaleServiceInDto): Promise<string> {
    const result: UpscaleResDto = await this.upscalingService.upscaleImage(
      data.imgUrl,
    );
    return result.url;
  }

  public async processQueueItem(data: MainGeneratorDto): Promise<void> {
    try {
      const { user, query, requestId } = data;
      this.logger.log(
        `Generation started for request '${requestId}', email ${user.email} and query '${query}'`,
      );
      await this.mailService.sendGreetingsMessage(user.email, query);
      this.logger.log(`Successfully greetings message to user ${user.email}`);
      await this.generationProgressService.update(data.requestId, 23);
      const images: GeneratedImageDto[] = await this.generateMainImages(data);
      const finalImages: FinalGeneratedImageDto[] = images.map(
        (i: GeneratedImageDto) => ({
          ...i,
          prompt: query,
        }),
      );
      await this.saveImages(finalImages, data, requestId);
      await this.generationProgressService.update(data.requestId, 100);
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
    } catch (e) {
      await this.generationProgressService.update(data.requestId, 100);
    }
  }

  private async saveImages(
    images: FinalGeneratedImageDto[],
    dto: MainGeneratorDto,
    requestId: string,
  ): Promise<void> {
    const resultImages: ImageToSave[] = images.map((i: GeneratedImageDto) => {
      const extension: string = this.getExtension(i.url);

      return {
        ...i,
        email: dto.user.email,
        name: `${generateHash(i.url)}.${extension}`,
        requestId: requestId,
        userId: dto.user.id,
        prompt: dto.query,
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
    await this.generationProgressService.init(
      dto.user.id,
      dto.requestId,
      dto.query,
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
    const progress: CurrentProgressDto =
      await this.generationProgressService.getProgress(dto.requestId);
    const step: number = Math.ceil(
      progress.progressLeft / generationServices.length,
    );
    const resultStep: number = step < 10 ? step : step - 10;
    for (const generationService of generationServices) {
      try {
        const generationImages: GeneratedImageDto[] =
          await generationService.generateImagesByQueries(textPrompts);
        resultImages.push(...generationImages);
        await this.generationProgressService.increment(
          dto.requestId,
          resultStep,
        );
      } catch (e) {
        console.log(e);
      }
    }
    return resultImages;
  }

  public async getRandomPics(amount: number): Promise<string[]> {
    const names: string[] = await this.imageRepository.getRandomPicsUrls(
      amount,
    );
    return names.map((name: string) => publicImgUrl(name));
  }

  public async imagesListByUserId(
    dto: ImagesByUserIdServiceInDto,
  ): Promise<ImagesByUserIdServiceOutDto> {
    const resultItems: PublicImage[] =
      await this.imageRepository.imagesByUserId(dto);

    return { images: resultItems };
  }

  public async getGenerationsProgressByUser(
    dto: GenerationsByUserIdServiceInDto,
  ): Promise<GenerationsByUserIdServiceOutDto> {
    const items: GenerationDto[] =
      await this.generationRepository.generationsByUserId(dto);
    return { generations: items };
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
