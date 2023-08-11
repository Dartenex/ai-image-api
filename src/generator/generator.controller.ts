import { Controller, Get, Query } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { MainGeneratorDto } from '@generator/dto';

@Controller('generator')
export class GeneratorController {
  public constructor(private generatorService: GeneratorService) {}

  @Get('main')
  public async main(
    @Query('query') query: string,
    @Query('email') email: string,
  ) {
    const start = new Date();
    const dto: MainGeneratorDto = {
      query: query,
      user: {
        userAgent: 'some agent',
        email: email,
      },
    };
    await this.generatorService.dispatchGenerationJob(dto);
    const end = new Date();
    return {
      result: 'Generation job dispatched',
      start: start.toISOString(),
      end: end.toISOString(),
    };
  }

  @Get('test-queue-scaling')
  public async test() {
    await this.generatorService.test();
  }
}
