import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailgunDriver } from './mailgun';

@Module({
  providers: [MailService, MailgunDriver],
  exports: [MailService],
})
export class MailModule {}
