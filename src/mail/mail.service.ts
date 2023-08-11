import { Injectable } from '@nestjs/common';
import { MailgunDriver } from './mailgun';
import { GenerationMailDto } from './dto';
import { ResultImage } from '@generator/dto';
import { delayCallback, randomMilliseconds } from '@utils';

@Injectable()
export class MailService {
  public constructor(private driver: MailgunDriver) {}

  public async sendGenerationMail(data: GenerationMailDto) {
    let success = false;
    let attempts = 3;
    let text = '';
    data.images.forEach((i: ResultImage) => {
      text += `${i.url}\n`;
    });
    do {
      try {
        console.log('send email', data);
        await delayCallback(randomMilliseconds(), async () => {
          await this.driver.sendMessage({
            text: text,
            subject: 'Images generation completed',
            to: [data.email],
          });
        });
        success = true;
      } catch (e) {
        console.log(e);
        success = false;
        attempts -= 1;
      }
    } while (!success && attempts !== 0);
  }

  public async sendGreetingsMessage(toEmail: string, prompt: string) {
    await this.driver.sendMessage({
      text: `Hello! Your generation request for query - <b>'${prompt}'</b> is in progress! Estimated time to deliver 5-10 minutes. Thank you for your patience.`,
      subject: 'GIO AI | Generation request in progress',
      to: [toEmail],
    });
  }
}
