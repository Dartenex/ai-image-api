import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { CacheDriverInterface } from '../contracts';

@Injectable()
export class RedisDriver
  implements CacheDriverInterface, OnModuleInit, OnModuleDestroy
{
  private readonly client: RedisClientType;

  public constructor() {
    this.client = createClient(this.getConfig());
  }

  async onModuleInit() {
    try {
      await this.client.connect();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  private getConfig() {
    return {
      url: 'redis://localhost:6379',
    };
  }

  public async get<T>(key: string): Promise<T> {
    return (await this.client.get(key)) as T;
  }

  public async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  public async lock() {
    // await this.client.;
  }
}
