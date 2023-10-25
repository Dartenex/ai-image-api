import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { render } from '@react-email/components';
import { GenerationSuccessMessage } from '../../email-builder/emails';
import puppeteer from 'puppeteer';
import { StorageService } from '../storage/storage.service';

@Controller('test')
export class TestController {
  public constructor(
    @InjectQueue('test-job') private testJobQueue: Queue,
    private readonly storageService: StorageService,
  ) {}

  @ApiExcludeEndpoint()
  @Get('/image')
  @HttpCode(HttpStatus.OK)
  public async image(@Query('link') link: string, @Query('name') name: string) {
    if (!link || !name) {
      return {
        success: false,
      };
    }
    await this.storageService.downloadAndSave(link, name);
    return {
      success: true,
    };
  }

  @ApiExcludeEndpoint()
  @Get('/health')
  @HttpCode(HttpStatus.OK)
  public async health() {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await browser.close();
    return {
      success: true,
    };
  }

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
