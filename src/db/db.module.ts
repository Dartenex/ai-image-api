import { Module } from '@nestjs/common';
import { MongodbService } from './drivers';

@Module({
  providers: [MongodbService],
  exports: [MongodbService],
})
export class DbModule {}
