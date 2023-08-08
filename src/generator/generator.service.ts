import { Injectable } from '@nestjs/common';
import { OpenAiService } from '@open-ai/open-ai.service';
import { MidjourneyService } from '@midjourney/midjourney.service';
import { MainGeneratorDto, ResultImage } from '@generator/dto';
import { LeonardoAiService } from '../leonardo-ai/leonardo-ai.service';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { MailService } from '../mail/mail.service';

@Injectable()
@Processor('generator')
export class GeneratorService {
  public constructor(
    private textGenerator: OpenAiService,
    private midjourneyAi: MidjourneyService,
    private leonardoAi: LeonardoAiService,
    @InjectQueue('generator') private generatorQueue: Queue,
    private mailService: MailService,
  ) {}

  @Process()
  public async queueProcessor(job: Job<MainGeneratorDto>) {
    const generatedImages: ResultImage[] = await this.generateMainImages(
      job.data,
    );
    await this.sendMessageToUser(job.data, generatedImages);
  }

  public async dispatchGenerationJob(dto: MainGeneratorDto) {
    await this.generatorQueue.add(dto);
    console.log('dispatched job');
  }

  public async generateMainImages(dto: MainGeneratorDto) {
    const textPrompts = await this.textGenerator.generatePromptsForImages(
      dto.query,
    );
    console.log(textPrompts);
    const midjourneyImages = await this.midjourneyAi.getImagesByQueries(
      textPrompts,
    );
    const leonardoResult = await this.leonardoAi.generateByQueries(textPrompts);
    const leonardoUpscaledImages: ResultImage[] =
      await this.leonardoAi.upscaleImages(leonardoResult);

    const allImages: ResultImage[] = [...leonardoUpscaledImages];
    midjourneyImages.forEach((images: any[]) => {
      const imgs = images.map(
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

  private async sendMessageToUser(
    dto: MainGeneratorDto,
    images: ResultImage[],
  ) {
    await this.mailService.sendGenerationMail({
      images,
      email: dto.user.email,
    });
  }
}
