import { Injectable, Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { delayCallback } from '@utils';
import { Job } from 'bull';

@Injectable()
@Processor('test-job')
export class TestConsumer {
  private readonly logger = new Logger(TestConsumer.name);
  // public constructor(private mailService: MailService) {}
  @Process()
  public async processTestJob(job: Job<any>) {
    await delayCallback(4000, () => {
      this.logger.log(
        `[${new Date().toString()}] Received job with id=${job.id}...`,
      );
      this.logger.error(
        `[${new Date().toString()}] Received job with id=${job.id}...`,
      );
      this.logger.debug(
        `[${new Date().toString()}] Received job with id=${job.id}...`,
      );
      this.logger.warn(
        `[${new Date().toString()}] Received job with id=${job.id}...`,
      );
      this.logger.verbose(
        `[${new Date().toString()}] Received job with id=${job.id}...`,
      );
    });
  }
}
