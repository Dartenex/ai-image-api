import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { MainGeneratorDto } from '@generator/dto';
import { Response } from 'express';

@Controller('generator')
export class GeneratorController {
  public constructor(private generatorService: GeneratorService) {}

  @Get('main')
  public async main(
    @Query('query') query: string,
    @Query('email') email: string,
    @Res() response: Response,
  ) {
    if (!email) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        error: 'Email is required',
      });
    }
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
