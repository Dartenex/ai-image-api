import { Injectable } from '@nestjs/common';
import { ImageRepositoryInterface } from '@generator/contracts';
import { MongodbService } from '@db/drivers';
import { Collection, WithId } from 'mongodb';
import { GeneratedImageDto, ImagesByUserIdRepoInDto, ImageToSave, PublicImage } from '@generator/dto';
import { ConfigService } from '@nestjs/config';
import { ImagesByUserIdServiceInDto } from '@generator/dto/images-by-user-id.service-in.dto';
import { offset, publicImgUrl } from '@utils';

@Injectable()
export class ImageRepository implements ImageRepositoryInterface {
  public constructor(
    private readonly mongoDb: MongodbService,
    private readonly config: ConfigService,
  ) {}

  async getRandomPicsUrls(amount: number): Promise<string[]> {
    const pipeline = [{ $sample: { size: amount } }];

    const result = await this.imagesCollection().aggregate(pipeline).toArray();
    return result.map((i: ImageToSave) => i.name);
  }

  async getImagesByRequestId(requestId: string): Promise<GeneratedImageDto[]> {
    const requestImages = await this.imagesCollection()
      .find({ requestId: requestId })
      .toArray();

    return requestImages.map((image: WithId<ImageToSave>) => ({
      ...image,
      url: image.name,
    }));
  }

  async saveMultipleImages(images: ImageToSave[]): Promise<void> {
    await this.imagesCollection().insertMany(images);
  }

  async imagesByUserId(dto: ImagesByUserIdRepoInDto): Promise<PublicImage[]> {
    const requestImages: WithId<ImageToSave>[] = await this.imagesCollection()
      .find({ userId: dto.userId })
      .limit(dto.perPage)
      .skip(offset(dto.page, dto.perPage))
      .sort('createdAt', 'desc')
      .toArray();

    return requestImages.map(
      (image: WithId<ImageToSave>): PublicImage => ({
        id: image._id.toString(),
        publicUrl: publicImgUrl(image.name),
        userId: image.userId,
        name: image.name,
        requestId: image.requestId,
        createdAt: image.createdAt,
        isUpscaled: image.isUpscaled,
      }),
    );
  }

  private imagesCollection(): Collection<ImageToSave> {
    return this.mongoDb
      .getConnection()
      .db(this.config.get<string>('MONGODB_DB_NAME'))
      .collection('images');
  }
}
