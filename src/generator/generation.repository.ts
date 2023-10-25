import { Injectable } from '@nestjs/common';
import { MongodbService } from '@db/drivers';
import { ConfigService } from '@nestjs/config';
import { Collection, InsertOneResult, WithId } from 'mongodb';
import { GenerationDto, GenerationsByUserIdRepoInDto } from '@generator/dto';
import { GenerationRepositoryInterface } from '@generator/contracts';
import { offset } from '@utils';

@Injectable()
export class GenerationRepository implements GenerationRepositoryInterface {
  public constructor(
    private readonly mongoDb: MongodbService,
    private readonly config: ConfigService,
  ) {}

  public async getProgress(requestId: string): Promise<number> {
    const generation: WithId<GenerationDto> = await this.collection().findOne({
      id: requestId,
    });
    return generation.progressInPercents;
  }

  public async create(data: GenerationDto): Promise<string> {
    const result: InsertOneResult<GenerationDto> =
      await this.collection().insertOne(data);
    const insertedId: string = result.insertedId.toString();
    return insertedId;
  }

  public async updateProgress(
    id: string,
    progressInPercents: number,
  ): Promise<void> {
    await this.collection().updateOne(
      { id: id },
      { $set: { progressInPercents: progressInPercents } },
    );
  }

  public async generationsByUserId(
    data: GenerationsByUserIdRepoInDto,
  ): Promise<GenerationDto[]> {
    const items: WithId<GenerationDto>[] = await this.collection()
      .find({ userId: data.userId })
      .sort('createdAt', 'desc')
      .limit(data.perPage)
      .skip(offset(data.page, data.perPage))
      .toArray();
    return items.map(
      (i: WithId<GenerationDto>): GenerationDto => ({
        id: i.id,
        userId: i.userId,
        progressInPercents: i.progressInPercents,
        prompt: i.prompt,
        createdAt: i.createdAt,
      }),
    );
  }

  private collection(): Collection<GenerationDto> {
    return this.mongoDb
      .getConnection()
      .db(this.config.get<string>('MONGODB_DB_NAME'))
      .collection('generations');
  }
}
