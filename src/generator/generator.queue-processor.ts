import { Process, Processor } from '@nestjs/bull';
import { QueueKeys } from '@generator/queue.keys';
import { Job } from 'bull';
import { MainGeneratorDto } from '@generator/dto';
import { GeneratorService } from '@generator/generator.service';

@Processor(QueueKeys.MAIN_QUEUE)
export class GeneratorQueueProcessor {
  public constructor(private readonly generatorService: GeneratorService) {}

  @Process()
  public async queueProcessorCallbacks(job: Job<MainGeneratorDto>) {
    try {
      await this.generatorService.processQueueItem(job);
    } catch (e) {
      console.log('ERROR DURING GENERATION JOB');
      console.log(e);
    }
  }
}
