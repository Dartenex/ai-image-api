import { Cron, CronExpression } from '@nestjs/schedule';
import { Inject, Logger } from '@nestjs/common';
import {
  GenerationRepositoryInterface,
  GeneratorDIKeys,
} from '@generator/contracts';

export class GeneratorSchedule {
  private readonly logger: Logger = new Logger(GeneratorSchedule.name);

  public constructor(
    @Inject(GeneratorDIKeys.GenerationRepository)
    private readonly generationRepository: GenerationRepositoryInterface,
  ) {}
  @Cron(CronExpression.EVERY_10_MINUTES)
  public async finishGenerations() {
    try {
      this.logger.log('Started updating old generations');
      await this.generationRepository.finishOldGenerations();
      this.logger.log('Finished updating old generations');
    } catch (e) {
      this.logger.error('Error while updating old generations');
      this.logger.log(e);
    }
  }
}
