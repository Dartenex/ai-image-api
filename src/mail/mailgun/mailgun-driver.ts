import { Injectable } from '@nestjs/common';
import Mailgun, { Interfaces, MailgunMessageData } from 'mailgun.js';
import { ConfigService } from '@nestjs/config';
import * as formData from 'form-data';

interface SendMessageDto {
  to: string[];
  subject: string;
  text: string;
}

@Injectable()
export class MailgunDriver {
  private client: Interfaces.IMailgunClient;
  private readonly domain: string;

  public constructor(private config: ConfigService) {
    this.domain = this.config.get<string>('MAILGUN_DOMAIN');
    const mailgun = new Mailgun(formData);
    this.client = mailgun.client({
      username: 'api',
      key: this.config.get<string>('MAILGUN_API_KEY'),
    });
  }

  public async sendMessage(data: SendMessageDto) {
    const messageData: MailgunMessageData = {
      from: 'GIO AI <support@gio.ai>',
      to: data.to.join(', '),
      subject: data.subject,
      html: data.text,
    };
    await this.client.messages.create(this.domain, messageData);
  }
}
