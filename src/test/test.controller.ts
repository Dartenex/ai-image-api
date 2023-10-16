import { Controller, Get } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('test')
export class TestController {
  public constructor(@InjectQueue('test-job') private testJobQueue: Queue) {}

  @Get('api')
  public async testApi() {
    await this.testJobQueue.add({
      data: 'test data 123',
    });
    console.log('dispatched job');
    return {};
  }
}
