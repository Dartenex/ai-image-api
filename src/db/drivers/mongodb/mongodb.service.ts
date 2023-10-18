import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';

@Injectable()
export class MongodbService {
  private readonly client: MongoClient;

  public constructor(private config: ConfigService) {
    const user = this.config.get<string>('MONGODB_USER');
    const password = this.config.get<string>('MONGODB_PASSWORD');
    const db = this.config.get<string>('MONGODB_DB_NAME');
    this.client = new MongoClient(
      `mongodb+srv://${user}:${password}@${db}.wqy5zyg.mongodb.net/?retryWrites=true&w=majority`,
    );
  }

  public getConnection(): MongoClient {
    return this.client;
  }
}
