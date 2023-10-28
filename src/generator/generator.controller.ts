import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req, Res
} from '@nestjs/common';
import { GeneratorService } from './generator.service';
import {
  BadRequestResponse,
  GenerateReqInDto,
  GenerationsByUserIdServiceInDto,
  GenerationsByUserIdServiceOutDto,
  GeneratorMainResDto,
  GetGenerationsByUserIdReqInDto,
  GetImagesByUserIdReqInDto,
  ImagesByUserIdServiceOutDto,
  MainGeneratorDto,
  MainResponse,
  PicturesResponse,
  UpscaleReqInDto,
  UpscaleServiceInDto,
  UpscaleServiceOutDto,
} from '@generator/dto';
import { Request, Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ImagesByUserIdServiceInDto } from '@generator/dto';
import { generateHash } from '@utils';

@Controller('generator')
export class GeneratorController {
  public constructor(private generatorService: GeneratorService) {}
  @Post('main')
  @ApiBody({
    type: GenerateReqInDto,
  })
  @ApiTags('ai')
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
  @ApiTags('ai')
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
  @ApiTags('ai')
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
    return await this.generatorService.imagesListByUserId(dto);
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
    name: 'onlyActive',
    type: Boolean,
    required: false,
    description: 'By default amount set to true',
  })
  @ApiQuery({
    name: 'perPage',
    type: Number,
    required: false,
    description: 'By default amount set to 10',
  })
  @ApiOkResponse({
    description:
      'Successful response with an array of generations with data about prompts and progress.',
    type: GenerationsByUserIdServiceOutDto,
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
  })
  @ApiTags('ai')
  @Get('generations/:userId')
  @HttpCode(HttpStatus.OK)
  public async getUserGenerations(
    @Param() query: GetGenerationsByUserIdReqInDto,
    @Query('page') page?: number | undefined,
    @Query('perPage') perPage?: number | undefined,
    @Query('onlyActive') onlyActive?: string | undefined,
  ): Promise<GenerationsByUserIdServiceOutDto> {
    const { userId } = query;
    const dto: GenerationsByUserIdServiceInDto = {
      userId: userId,
      page: Number(page ?? 1),
      perPage: Number(perPage ?? 20),
      onlyActive: onlyActive !== 'false',
    };
    return await this.generatorService.getGenerationsProgressByUser(dto);
  }

  @Post('upscale')
  @ApiTags('ai')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: UpscaleReqInDto,
    description:
      'Endpoint requires image url (ONLY HTTPS) to process upscaling.',
  })
  @ApiOkResponse({
    description:
      'Successful response with an array of generations with data about prompts and progress.',
    type: UpscaleServiceOutDto,
  })
  public async upscale(
    @Body() body: UpscaleReqInDto,
    @Res() response: Response,
  ) {
    const dto: UpscaleServiceInDto = {
      imgUrl: body.imgUrl,
    };
    const upscaledUrl: string = await this.generatorService.upscaleImage(dto);
    if (!upscaledUrl) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        error: 'Something went wrong during upscaling!',
      });
    }
    const resultData: UpscaleServiceOutDto = {
      imgUrl: upscaledUrl,
    };
    return response.status(HttpStatus.OK).json(resultData);
  }
}
