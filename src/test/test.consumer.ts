import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { delayCallback } from '@utils';
import { Job } from 'bull';

@Injectable()
@Processor('test-job')
export class TestConsumer {
  // public constructor(private mailService: MailService) {}
  @Process()
  public async processTestJob(job: Job<any>) {
    await delayCallback(4000, () => {
      console.log(`[${new Date().toString()}] Received job with id=${job.id}...`);
    });
  }
}
