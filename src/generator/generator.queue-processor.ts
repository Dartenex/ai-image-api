import { Process, Processor } from '@nestjs/bull';
import { QueueKeys } from '@generator/queue.keys';
import { Job } from 'bull';
import { MainGeneratorDto } from '@generator/dto';
import { GeneratorService } from '@generator/generator.service';
import { Logger } from '@nestjs/common';

@Processor(QueueKeys.MAIN_QUEUE)
export class GeneratorQueueProcessor {
  private readonly logger = new Logger(GeneratorService.name);

  public constructor(private readonly generatorService: GeneratorService) {}

  @Process()
  public async queueProcessorCallbacks(job: Job<MainGeneratorDto>) {
    const { user } = job.data;
    try {
      await this.generatorService.processQueueItem(job);
    } catch (e) {
      this.logger.error(`JOB FOR USER ${user.email} FAILED.`);
      this.logger.error(e);
    }
  }
}
