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
  GeneratorMainResDto,
  GetImagesByUserIdReqInDto,
  ImagesByUserIdServiceOutDto,
  MainGeneratorDto,
  MainResponse,
  PicturesResponse,
} from '@generator/dto';
import { Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ImagesByUserIdServiceInDto } from '@generator/dto';
import { generateHash } from '@utils';

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
        userId: {
          type: 'string',
        },
        redirectUrl: {
          type: 'string',
          description:
            'User will receive email with given redirect link to view his images.',
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
  ): Promise<GeneratorMainResDto> {
    const { prompt, email, userId, redirectUrl } = reqBody;
    const requestId: string = generateHash(reqBody);
    const dto: MainGeneratorDto = {
      query: prompt,
      user: {
        userAgent: request.get('user-agent'),
        email: email,
        id: userId,
      },
      requestId: requestId,
      redirectUrl,
    };
    await this.generatorService.dispatchGenerationJob(dto);
    return { result: true, requestId: requestId };
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

  @ApiParam({
    name: 'userId',
    type: String,
    required: true,
    description: 'User id key.',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'By default amount set to 1',
  })
  @ApiQuery({
    name: 'perPage',
    type: Number,
    required: false,
    description: 'By default amount set to 20',
  })
  @ApiOkResponse({
    description: 'Successful response with an array of images.',
    type: ImagesByUserIdServiceOutDto,
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
  })
  @Get('images/:userId')
  @HttpCode(HttpStatus.OK)
  public async getImageByUserId(
    @Param() query: GetImagesByUserIdReqInDto,
    @Query('page') page?: number | null,
    @Query('perPage') perPage?: number | null,
  ): Promise<ImagesByUserIdServiceOutDto> {
    const { userId } = query;
    const dto: ImagesByUserIdServiceInDto = {
      userId: userId,
      page: Number(page ?? 1),
      perPage: Number(perPage ?? 20),
    };
    const result: ImagesByUserIdServiceOutDto =
      await this.generatorService.imagesListByUserId(dto);

    return result;
  }
}
