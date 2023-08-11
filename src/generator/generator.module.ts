import { Module } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { MidjourneyModule } from '@midjourney/midjourney.module';
import { OpenAiModule } from '@open-ai/open-ai.module';
import { GeneratorController } from '@generator/generator.controller';
import { LeonardoAiModule } from '../leonardo-ai/leonardo-ai.module';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { MailModule } from '../mail/mail.module';
import { StorageModule } from '../storage/storage.module';
import { MongodbModule } from '../mongodb/mongodb.module';
import { TestService } from '@generator/test.service';
import { QueueOptions } from 'bull';

const queueOptions: QueueOptions = {
  defaultJobOptions: {
    removeOnComplete: true,
    attempts: 2,
    delay: 1,
  },
};

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
        ...queueOptions,
      }),
      name: 'scaling',
    }),
    BullModule.registerQueueAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
        ...queueOptions,
      }),
      name: 'generator',
    }),
    MailModule,
    StorageModule,
    MongodbModule,
  ],
  providers: [GeneratorService, TestService],
  controllers: [GeneratorController],
})
export class GeneratorModule {}
