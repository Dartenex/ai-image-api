import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Collection, MongoClient } from 'mongodb';
import { ImageToSave } from '@generator/dto';

@Injectable()
export class MongodbService {
  private client: MongoClient;

  public constructor(private config: ConfigService) {
    const user = this.config.get<string>('MONGODB_USER');
    const password = this.config.get<string>('MONGODB_PASSWORD');
    const db = this.config.get<string>('MONGODB_DB_NAME');
    this.client = new MongoClient(
      `mongodb+srv://${user}:${password}@${db}.wqy5zyg.mongodb.net/?retryWrites=true&w=majority`,
    );
  }

  public imagesCollection(): Collection<ImageToSave> {
    return this.client
      .db(this.config.get<string>('MONGODB_DB_NAME'))
      .collection('images');
  }
}
