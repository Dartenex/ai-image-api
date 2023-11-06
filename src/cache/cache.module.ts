import { Module } from '@nestjs/common';
import { InjectKeys } from './contracts';
import { RedisDriver } from './drivers';

const providers = [
  {
    provide: InjectKeys.CacheService,
    useClass: RedisDriver,
  },
];

@Module({
  providers: providers,
  exports: providers,
})
export class CacheModule {}
