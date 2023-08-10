import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import puppeteer from 'puppeteer';
import { writeFileSync, readFileSync, rmSync } from 'fs';
import { storageDir } from '@utils';

@Injectable()
export class StorageService {
  private client: S3Client;
  private readonly s3Bucket: string;

  public constructor(private config: ConfigService) {
    this.client = new S3Client({
      region: this.config.get<string>('AWS_S3_REGION'),
    });
    this.s3Bucket = this.config.get<string>('AWS_S3_BUCKET');
  }

  public async uploadFile(name: string) {
    const uploadCommand = new PutObjectCommand({
      Bucket: this.s3Bucket,
      Key: name,
      Body: readFileSync(this.getFilePath(name)),
    });
    const res = await this.client.send(uploadCommand);
    console.log(res);
  }

  public async downloadAndSave(link: string, name: string) {
    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();
    const view = await page.goto(link);
    writeFileSync(this.getFilePath(name), await view.buffer());
    await browser.close();
    await this.uploadFile(name);
    this.deleteFile(name);
  }

  private deleteFile(name: string): void {
    rmSync(this.getFilePath(name));
  }

  private getFilePath(name: string): string {
    return `${storageDir}/${name}`;
  }
}
