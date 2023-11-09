import { Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Browser, HTTPResponse, Page } from 'puppeteer';
import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

@Injectable()
export class StorageService {
  private client: S3Client;
  private readonly s3Bucket: string;
  private readonly logger: Logger = new Logger(StorageService.name);

  public constructor(private config: ConfigService) {
    this.client = new S3Client({
      region: this.config.get<string>('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.config.get<string>('AWS_S3_ACCESS_KEY_ID'),
        secretAccessKey: this.config.get<string>('AWS_S3_SECRET_ACCESS_KEY'),
      },
    });
    this.s3Bucket = this.config.get<string>('AWS_S3_BUCKET');
  }

  public async uploadImage(name: string, extension: string, body: Buffer) {
    const uploadCommand: PutObjectCommand = new PutObjectCommand({
      Bucket: this.s3Bucket,
      Key: `images/${name}`,
      Body: body,
      ContentType: `image/${extension}`,
    });
    await this.client.send(uploadCommand);
  }

  public async downloadAndSave(link: string, name: string) {
    try {
      this.logger.log(
        `Download and save START by link=${link} and name=${name}`,
      );
      const browser: Browser = await puppeteerExtra
        .use(StealthPlugin())
        .launch({
          headless: 'new',
          args: ['--no-sandbox'],
        });
      const page: Page = await browser.newPage();
      const view: HTTPResponse = await page.goto(link, {
        waitUntil: 'domcontentloaded',
      });
      const fileData: Buffer = await view.buffer();
      await browser.close();
      await this.uploadImage(name, this.getExtension(name), fileData);
      this.logger.log(
        `Download and save FINISH by link=${link} and name=${name}`,
      );
    } catch (e) {
      this.logger.error('Download and save image fail!');
      this.logger.error(e);
    }
  }

  private getExtension(link: string): string {
    const regExp = new RegExp(/\.(?<extension>(png|jpg|jpeg)$)/);
    return link.match(regExp).groups.extension;
  }
}
