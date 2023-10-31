import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import puppeteer from 'puppeteer';
import { StorageService } from '@storage/storage.service';

@Controller('test')
export class TestController {
  public constructor(
    @InjectQueue('test-job') private testJobQueue: Queue,
    private readonly storageService: StorageService,
  ) {}

  @ApiExcludeEndpoint()
  @Get('/proc')
  @HttpCode(HttpStatus.OK)
  public async proc() {
    return {
      pid: process?.pid ?? 'UNKNOWN',
    };
  }

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
    console.log('test api');
    await this.testJobQueue.add({
      data: 'test data 123',
    });
    console.log('dispatched job');
    return {};
  }
}
