import { Injectable, OnModuleInit } from '@nestjs/common';
import * as sdk from 'api';
import { ConfigService } from '@nestjs/config';
import { KeyStorageService } from '@key-storage/key-storage.service';

@Injectable()
export class LeonardoClientFactory implements OnModuleInit {
  private readonly idKey: string = 'leonardo_ai_api_keys';

  public constructor(
    private readonly configService: ConfigService,
    private readonly keyStorage: KeyStorageService,
  ) {}

  public async createClient(): Promise<any> {
    const client = sdk('@leonardoai/v1.0#28807z41owlgnis8jg');
    const key: string = await this.getKey();
    client.auth(key);
    return client;
  }

  private async getKey(): Promise<string> {
    const defaultKey: string = this.configService.get<string>(
      'DEFAULT_LEONARDO_AI_API_KEY',
    );
    return await this.keyStorage.getRandomKey(this.idKey, defaultKey);
  }

  async onModuleInit() {
    const keysString: string = this.configService.get<string>(
      'LEONARDO_AI_API_KEYS',
    );
    const keys: string[] = keysString.split(',');
    await this.keyStorage.initKeys(this.idKey, keys);
  }
}
