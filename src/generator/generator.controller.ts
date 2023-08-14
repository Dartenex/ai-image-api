import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { GeneratorService } from './generator.service';
import {
  BadRequestResponse,
  MainGeneratorDto,
  MainResponse,
  PicturesResponse,
  UpscaleImageBody,
  UpscaleImageResponse
} from '@generator/dto';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';

@Controller('generator')
export class GeneratorController {
  public constructor(private generatorService: GeneratorService) {}
  @Get('main')
  @ApiQuery({
    name: 'query',
    type: String,
    required: true,
    description: 'User query, generation request.',
  })
  @ApiQuery({
    name: 'email',
    type: String,
    required: true,
    description: 'User email.',
  })
  @ApiOkResponse({
    description:
      'Sucessfull response with message that request dispatched, in progress.',
    type: MainResponse,
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
  })
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
    if (!query) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        error: 'Query is required',
      });
    }
    const dto: MainGeneratorDto = {
      query: query,
      user: {
        userAgent: 'some agent',
        email: email,
      },
    };
    await this.generatorService.dispatchGenerationJob(dto);
    return response.status(HttpStatus.OK).json({
      result: 'Generation job dispatched',
    });
  }

  @ApiOkResponse({
    description: 'Successful response with an array of picture objects.',
    type: PicturesResponse,
  })
  @ApiQuery({
    name: 'amount',
    type: Number,
    required: false,
    description: 'By default amount set to 6',
  })
  @Get('random-pictures')
  public async randomPics(
    @Query('amount') amount = 6,
  ): Promise<PicturesResponse> {
    const images = await this.generatorService.getRandomPics(amount);
    return {
      pictures: images,
    };
  }

  @ApiOkResponse({
    description: 'Successful response with an array of picture objects.',
    type: UpscaleImageResponse,
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
  })
  @Post('upscale-image')
  public async upscaleImage(
    @Body() body: UpscaleImageBody,
    @Res() response: Response,
  ): Promise<any> {
    if (!body.url) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        error: 'Query is required',
      });
    }
    const result = await this.generatorService.upscaleImage(body.url);
    return response.status(HttpStatus.OK).json({
      url: result,
    });
  }
}
