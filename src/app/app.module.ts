import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GeneratorModule } from '@generator/generator.module';
import { ApiKeyMiddleware } from './middlewares';
import { TestModule } from '../test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GeneratorModule,
    TestModule,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(ApiKeyMiddleware).forRoutes('/generator');
  }
}
