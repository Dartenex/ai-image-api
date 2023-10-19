import { Controller, Get } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { render } from '@react-email/components';
import { GenerationSuccessMessage } from '../../email-builder/emails';

@Controller('test')
export class TestController {
  public constructor(@InjectQueue('test-job') private testJobQueue: Queue) {}

  @ApiExcludeEndpoint()
  @Get('api')
  public async testApi() {
    const result = render(
      GenerationSuccessMessage({
        redirectUrl: 'https://api.selfcouture.co/api/docs',
        imageUrls: [
          'https://i.imgur.com/uG086uW.png',
          'https://i.imgur.com/uG086uW.png',
          'https://i.imgur.com/uG086uW.png',
          'https://i.imgur.com/uG086uW.png',
        ],
      }),
    );
    console.log(result);
    console.log('test api');
    await this.testJobQueue.add({
      data: 'test data 123',
    });
    console.log('dispatched job');
    return {};
  }
}
