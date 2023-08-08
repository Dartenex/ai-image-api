import { Module } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { MidjourneyModule } from '@midjourney/midjourney.module';
import { OpenAiModule } from '@open-ai/open-ai.module';
import { GeneratorController } from '@generator/generator.controller';
import { LeonardoAiModule } from '../leonardo-ai/leonardo-ai.module';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MidjourneyModule,
    OpenAiModule,
    LeonardoAiModule,
    BullModule.registerQueueAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
      name: 'generator',
    }),
    MailModule,
  ],
  providers: [GeneratorService],
  controllers: [GeneratorController],
})
export class GeneratorModule {}
