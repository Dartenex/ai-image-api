import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { TestConsumer } from './test.consumer';
import { TestController } from './test.controller';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    StorageModule,
    BullModule.registerQueueAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
        defaultJobOptions: {
          removeOnComplete: true,
          attempts: 2,
          delay: 1,
        },
      }),
      name: 'test-job',
    }),
  ],
  providers: [TestConsumer],
  controllers: [TestController],
})
export class TestModule {}
