import { Injectable, OnModuleInit } from '@nestjs/common';
import { TNL } from 'tnl-midjourney-api';
import { ConfigService } from '@nestjs/config';
import { KeyStorageService } from '@key-storage/key-storage.service';

@Injectable()
export class MidjourneyClientFactory implements OnModuleInit {
  private readonly idKey: string = 'midjourney_api_keys';

  public constructor(
    private readonly configService: ConfigService,
    private readonly keyStorage: KeyStorageService,
  ) {}

  public async createClient(): Promise<TNL> {
    const key: string = await this.getKey();
    return new TNL(key);
  }

  private async getKey(): Promise<string> {
    const defaultKey: string = this.configService.get<string>(
      'DEFAULT_MIDJOURNEY_API_KEY',
    );
    return await this.keyStorage.getRandomKey(this.idKey, defaultKey);
  }

  async onModuleInit() {
    const keysString: string = this.configService.get<string>(
      'MIDJOURNEY_API_KEYS',
    );
    const keys: string[] = keysString.split(',');
    await this.keyStorage.initKeys(this.idKey, keys);
  }
}
