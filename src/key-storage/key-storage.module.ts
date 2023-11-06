import { Module } from '@nestjs/common';
import { KeyStorageService } from './key-storage.service';
import { CacheModule } from '@cache/cache.module';

@Module({
  imports: [CacheModule],
  providers: [KeyStorageService],
  exports: [KeyStorageService],
})
export class KeyStorageModule {}
