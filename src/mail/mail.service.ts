import { Injectable, Logger } from '@nestjs/common';
import { MailgunDriver } from './mailgun';
import { GenerationMailDto } from './dto';
import { delayCallback, mailTemplatesDir, randomMilliseconds } from '@utils';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { GeneratedImageDto } from '@generator/dto';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  public constructor(private driver: MailgunDriver) {}

  private async sendWithAttempts(callback: () => any, attempts = 3) {
    let success = false;
    let attemptsLeft = attempts;
    do {
      try {
        await delayCallback(randomMilliseconds(), async () => {
          await callback();
        });
        success = true;
        this.logger.log('Successfully sent an email...');
      } catch (e) {
        this.logger.error('Something went wrong during mail sending...', e);
        success = false;
        attemptsLeft -= 1;
      }
    } while (!success && attemptsLeft !== 0);
  }

  public async sendGenerationMail(data: GenerationMailDto) {
    const text = `<p>View your images by link: <a href="${data.redirectUrl}">View images</a></p>`;
    // data.images.forEach((i: GeneratedImageDto) => {
    //   const url = this.getImgUrlByName(i.url);
    //   text += `${url}\n`;
    // });
    await this.sendWithAttempts(async () => {
      await this.driver.sendMessage({
        text: text,
        subject: 'Images generation completed',
        to: [data.email],
      });
    });
  }

  private getImgUrlByName(name: string): string {
    return `https://gio-ai-api-bucket.s3.amazonaws.com/images/${name}`;
  }

  public async sendGreetingsMessage(toEmail: string, prompt: string) {
    await this.sendWithAttempts(async () => {
      await this.driver.sendMessage({
        text: `Hello! Your generation request for query - <b>'${prompt}'</b> is in progress! Estimated time to deliver 5-10 minutes. Thank you for your patience.`,
        subject: 'GIO AI | Generation request in progress',
        to: [toEmail],
      });
    });
  }

  private readTemplateHtml(template: string): string {
    const mailTemplate = readFileSync(
      resolve(mailTemplatesDir, `${template}.html`),
    );
    return mailTemplate.toString();
  }
}
