import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { GeneratorService } from './generator.service';
import {
  BadRequestResponse,
  GenerateReqInDto,
  GetImagesByUserIdReqInDto,
  MainGeneratorDto,
  MainResponse,
  PicturesResponse,
  UpscaleImageBody,
  UpscaleImageResponse,
} from '@generator/dto';
import { Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';

@Controller('generator')
export class GeneratorController {
  public constructor(private generatorService: GeneratorService) {}
  @Post('main')
  @ApiBody({
    schema: {
      properties: {
        prompt: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        user_id: {
          type: 'string',
        },
      },
    },
  })
  @ApiOkResponse({
    description:
      'Successful response with message that request dispatched, images generation started and in progress.',
    type: MainResponse,
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
  })
  public async main(
    @Body() reqBody: GenerateReqInDto,
    @Req() request: Request,
  ) {
    const { prompt, email, userId } = reqBody;
    const dto: MainGeneratorDto = {
      query: prompt,
      user: {
        userAgent: request.get('user-agent'),
        email: email,
        id: userId,
      },
    };
    await this.generatorService.dispatchGenerationJob(dto);
    return { result: true };
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
  @Get('random-images')
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
  @HttpCode(HttpStatus.OK)
  public async upscaleImage(@Body() body: UpscaleImageBody): Promise<any> {
    const result = await this.generatorService.upscaleImage(body.url);
    return {
      url: result,
    };
  }

  @Get('images/:userId')
  public async getImageByUserId(@Param() query: GetImagesByUserIdReqInDto) {
    const { userId } = query;

    return {};
  }
}
