import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { delayCallback } from '@utils';
import { Job } from 'bull';

@Injectable()
@Processor('scaling')
export class TestService {
  @Process()
  public async scalingProcessor(job: Job<any>) {
    const start = new Date();
    console.log(
      `[${start.toISOString()}]: Start '${job.queue.name}' processing...`,
    );
    // await delayCallback(5000, () => {
    //   console.log('delay executed');
    // });
    // console.log(`[${end.toISOString()}]: Finish scaling processing...`);
    delayCallback(15000, () => {
      console.log('delay executed');
    }).then(() => {
      const end = new Date();
      console.log(
        `[${end.toISOString()}]: Finish '${job.queue.name}' processing...`,
      );
    });
  }
}
