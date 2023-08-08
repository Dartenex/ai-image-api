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
}
