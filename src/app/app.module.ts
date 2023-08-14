import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GeneratorModule } from '@generator/generator.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), GeneratorModule],
  providers: [AppService],
})
export class AppModule {}
