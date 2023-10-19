import { Controller, Get } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('test')
export class TestController {
  public constructor(@InjectQueue('test-job') private testJobQueue: Queue) {}

  @ApiExcludeEndpoint()
  @Get('api')
  public async testApi() {
    console.log('test api');
    await this.testJobQueue.add({
      data: 'test data 123',
    });
    console.log('dispatched job');
    return {};
  }
}
