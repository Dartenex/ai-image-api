import { Injectable } from '@nestjs/common';
import { ImageRepositoryInterface } from '@generator/contracts';
import { MongodbService } from '@db/drivers';
import { Collection, WithId } from 'mongodb';
import { ImageToSave, ResultImage } from '@generator/dto';
import { ConfigService } from '@nestjs/config';

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

  async getImagesByRequestId(requestId: string): Promise<ResultImage[]> {
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

  private imagesCollection(): Collection<ImageToSave> {
    return this.mongoDb
      .getConnection()
      .db(this.config.get<string>('MONGODB_DB_NAME'))
      .collection('images');
  }
}
