import { Injectable, Logger } from '@nestjs/common';
import { MailgunDriver } from './mailgun';
import { GenerationMailDto } from './dto';
import {
  delayCallback,
  mailTemplatesDir,
  publicImgUrl,
  randomMilliseconds,
} from '@utils';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { render } from '@react-email/render';
import {
  GenerationGreetingsMessage,
  GenerationSuccessMessage,
} from '../../email-builder/emails';

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
    const template = render(
      GenerationSuccessMessage({
        redirectUrl: data.redirectUrl,
        imageUrls: data.images.map((i) => publicImgUrl(i.url)).slice(0, 4),
      }),
    );

    await this.sendWithAttempts(async () => {
      await this.driver.sendMessage({
        text: template,
        subject: 'Images generation completed',
        to: [data.email],
      });
    });
  }

  private getImgUrlByName(name: string): string {
    return `https://gio-ai-api-bucket.s3.amazonaws.com/images/${name}`;
  }

  public async sendGreetingsMessage(toEmail: string, prompt: string) {
    const template = render(
      GenerationGreetingsMessage({
        prompt: prompt,
      }),
    );
    await this.sendWithAttempts(async () => {
      await this.driver.sendMessage({
        text: template,
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
