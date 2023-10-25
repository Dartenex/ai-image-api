import { Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import puppeteer, { Browser, HTTPResponse, Page } from 'puppeteer';
import { writeFileSync, readFileSync, rmSync } from 'fs';
import { storageDir } from '@utils';

@Injectable()
export class StorageService {
  private client: S3Client;
  private readonly s3Bucket: string;
  private readonly logger: Logger = new Logger(StorageService.name);

  public constructor(private config: ConfigService) {
    this.client = new S3Client({
      region: this.config.get<string>('AWS_S3_REGION'),
    });
    this.s3Bucket = this.config.get<string>('AWS_S3_BUCKET');
  }

  public async uploadImage(name: string, extension: string) {
    const uploadCommand = new PutObjectCommand({
      Bucket: this.s3Bucket,
      Key: `images/${name}`,
      Body: readFileSync(this.getFilePath(name)),
      ContentType: `image/${extension}`,
    });
    await this.client.send(uploadCommand);
  }

  public async downloadAndSave(link: string, name: string) {
    try {
      this.logger.log(
        `Download and save START by link=${link} and name=${name}`,
      );
      const browser: Browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox'],
      });
      const page: Page = await browser.newPage();
      const view: HTTPResponse = await page.goto(link);
      const fileData = await view.buffer();
      writeFileSync(this.getFilePath(name), fileData);
      await browser.close();
      await this.uploadImage(name, this.getExtension(name));
      this.deleteFile(name);
      this.logger.log(
        `Download and save FINISH by link=${link} and name=${name}`,
      );
    } catch (e) {
      this.logger.error('Download and save image fail!');
      this.logger.error(e);
    }
  }

  private deleteFile(name: string): void {
    rmSync(this.getFilePath(name));
  }

  private getFilePath(name: string): string {
    return `${storageDir}/${name}`;
  }

  private getExtension(link: string): string {
    const regExp = new RegExp(/\.(?<extension>(png|jpg|jpeg)$)/);
    return link.match(regExp).groups.extension;
  }
}
