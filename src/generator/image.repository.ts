import { Injectable } from '@nestjs/common';
import { ImageRepositoryInterface } from '@generator/contracts';
import { MongodbService } from '@db/drivers';
import { Collection, WithId, ObjectId } from 'mongodb';
import {
  GeneratedImageDto,
  ImagesByUserIdRepoInDto,
  ImageToSave,
  PublicImage,
} from '@generator/dto';
import { ConfigService } from '@nestjs/config';
import { offset, publicImgUrl } from '@utils';

@Injectable()
export class ImageRepository implements ImageRepositoryInterface {
  public constructor(
    private readonly mongoDb: MongodbService,
    private readonly config: ConfigService,
  ) {}

  async getById(id: string): Promise<PublicImage | null> {
    const item: WithId<ImageToSave> | null = await this.collection().findOne({
      _id: new ObjectId(id),
    });
    if (!item) {
      return null;
    }
    return this.toPublicImage(item);
  }

  async getRandomPicsUrls(amount: number): Promise<string[]> {
    const pipeline = [{ $sample: { size: amount } }];

    const result = await this.collection().aggregate(pipeline).toArray();
    return result.map((i: ImageToSave) => i.name);
  }

  async getImagesByRequestId(requestId: string): Promise<GeneratedImageDto[]> {
    const requestImages = await this.collection()
      .find({ requestId: requestId })
      .toArray();

    return requestImages.map((image: WithId<ImageToSave>) => ({
      ...image,
      url: image.name,
    }));
  }

  async saveMultipleImages(images: ImageToSave[]): Promise<void> {
    await this.collection().insertMany(images);
  }

  async imagesByUserId(dto: ImagesByUserIdRepoInDto): Promise<PublicImage[]> {
    const requestImages: WithId<ImageToSave>[] = await this.collection()
      .find({ userId: dto.userId })
      .limit(dto.perPage)
      .skip(offset(dto.page, dto.perPage))
      .sort('createdAt', 'desc')
      .toArray();

    return this.toPublicImages(requestImages);
  }

  private toPublicImages(items: WithId<ImageToSave>[]): PublicImage[] {
    return items.map(this.toPublicImage);
  }

  private toPublicImage(image: WithId<ImageToSave>): PublicImage {
    return {
      id: image._id.toString(),
      publicUrl: publicImgUrl(image.name),
      userId: image.userId,
      name: image.name,
      requestId: image.requestId,
      createdAt: image.createdAt,
      isUpscaled: image.isUpscaled,
      prompt: image?.prompt ?? null,
    };
  }

  private collection(): Collection<ImageToSave> {
    return this.mongoDb
      .getConnection()
      .db(this.config.get<string>('MONGODB_DB_NAME'))
      .collection('images');
  }
}
