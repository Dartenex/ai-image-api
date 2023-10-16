import { Injectable } from '@nestjs/common';
import { OpenAiService } from '@open-ai/open-ai.service';
import { MidjourneyService } from '@midjourney/midjourney.service';
import { ImageToSave, MainGeneratorDto, ResultImage } from '@generator/dto';
import { LeonardoAiService } from '../leonardo-ai/leonardo-ai.service';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { MailService } from '../mail/mail.service';
import { StorageService } from '../storage/storage.service';
import { createHash } from 'crypto';
import { MongodbService } from '../mongodb/mongodb.service';
import { delayCallback, logTime } from '@utils';
import { WithId } from 'mongodb';

@Injectable()
@Processor('generator')
export class GeneratorService {
  public constructor(
    private textGenerator: OpenAiService,
    private midjourneyAi: MidjourneyService,
    private leonardoAi: LeonardoAiService,
    @InjectQueue('generator') private generatorQueue: Queue,
    private mailService: MailService,
    private storageService: StorageService,
    private mongoDb: MongodbService,
  ) {}

  @Process()
  public async queueProcessorCallbacks(job: Job<MainGeneratorDto>) {
    try {
      const requestId = this.getRequestId(job.data.user.email, job.data.query);
      const start = new Date();
      console.log(
        `[${start.toISOString()}]: Generation started for request ${requestId} and email ${
          job.data.user.email
        }`,
      );
      await this.sendGreetingMal(job.data);
      const images: ResultImage[] = await this.generateMainImages(job.data);
      await this.saveImages(images, job.data, requestId);
      await this.sendMessageToUser(job.data, requestId);
      const end = new Date();
      console.log(
        `[${end.toISOString()}]: Generation finished for request ${requestId} and email ${
          job.data.user.email
        }`,
      );
    } catch (e) {
      console.log('ERROR DURING GENERATION JOB');
      console.log(e);
    }
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
        name: `${this.generateImgName(i.url)}.${extension}`,
        requestId: requestId,
      };
    });
    for (const image of resultImages) {
      await this.storageService.downloadAndSave(image.url, image.name);
    }
    await this.saveInDb(resultImages);
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
    const names = await this.mongoDb.randomImageDocs(amount);
    return names.map((name: string) => this.getImgUrlByName(name));
  }

  public async upscaleImage(url: string): Promise<string> {
    await delayCallback(2345, () => 1);
    return url;
  }

  private async sendMessageToUser(dto: MainGeneratorDto, requestId: string) {
    const requestImages = await this.mongoDb
      .imagesCollection()
      .find({ requestId: requestId })
      .toArray();

    const processedImages: ResultImage[] = requestImages.map(
      (image: WithId<ImageToSave>) => ({
        ...image,
        url: this.getImgUrlByName(image.name),
      }),
    );
    await this.mailService.sendGenerationMail({
      images: processedImages,
      email: dto.user.email,
    });
  }

  private getImgUrlByName(name: string): string {
    return `https://gio-ai-api-bucket.s3.amazonaws.com/images/${name}`;
  }

  private async saveInDb(images: ImageToSave[]) {
    await this.mongoDb.imagesCollection().insertMany(images);
  }

  private getRequestId(email: string, query: string): string {
    const hash = createHash('sha256');
    hash.update(`${new Date().getTime()} ${email} ${query}`);
    return hash.digest('hex');
  }

  private generateImgName(url: string): string {
    const hash = createHash('sha256');
    return hash.update(url).digest('hex');
  }

  private getExtension(link: string): string {
    const regExp = new RegExp(/\.(?<extension>(png|jpg|jpeg)$)/);
    return link.match(regExp).groups.extension;
  }

  private async sendGreetingMal(dto: MainGeneratorDto) {
    await this.mailService.sendGreetingsMessage(dto.user.email, dto.query);
  }
}
