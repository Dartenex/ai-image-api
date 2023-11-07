import { Module } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { OpenAiModule } from '@open-ai/open-ai.module';
import { GeneratorController } from '@generator/generator.controller';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { MailModule } from '@mail/mail.module';
import { StorageModule } from '@storage/storage.module';
import { TestService } from '@generator/test.service';
import { QueueOptions } from 'bull';
import { GeneratorDIKeys } from '@generator/contracts';
import { ImageRepository } from '@generator/image.repository';
import { DbModule } from '@db/db.module';
import { LeonardoAiService, MidjourneyService } from '@generator/drivers';
import { GeneratorQueueProcessor } from '@generator/generator.queue-processor';
import { GenerationRepository } from '@generator/generation.repository';
import { GenProgressService } from '@generator/gen-progress.service';
import { PicsartService } from '@generator/drivers/picsart';
import { KeyStorageModule } from '../key-storage';
import { MidjourneyClientFactory } from '@generator/drivers/midjourney/midjourney.client-factory';
import { LeonardoClientFactory } from '@generator/drivers/leonardo-ai/leonardo.client-factory';

const queueOptions: QueueOptions = {
  defaultJobOptions: {
    removeOnComplete: true,
    attempts: 2,
    delay: 1,
  },
};

@Module({
  imports: [
    KeyStorageModule,
    OpenAiModule,
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
    DbModule,
  ],
  providers: [
    LeonardoClientFactory,
    MidjourneyClientFactory,
    PicsartService,
    MidjourneyService,
    LeonardoAiService,
    GeneratorService,
    TestService,
    {
      provide: GeneratorDIKeys.ImageRepository,
      useClass: ImageRepository,
    },
    {
      provide: GeneratorDIKeys.GenerationRepository,
      useClass: GenerationRepository,
    },
    GeneratorQueueProcessor,
    GenProgressService,
  ],
  controllers: [GeneratorController],
})
export class GeneratorModule {}
