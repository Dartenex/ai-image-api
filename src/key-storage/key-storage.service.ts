import { Inject, Injectable } from '@nestjs/common';
import { CacheDriverInterface, InjectKeys } from '@cache/contracts';
import { uniqueArray } from '@utils';

@Injectable()
export class KeyStorageService {
  private readonly maxCounter: number = 1000;

  public constructor(
    @Inject(InjectKeys.CacheService)
    private readonly cache: CacheDriverInterface,
  ) {}

  public async getRandomKey(idKey: string, defaultValue = ''): Promise<string> {
    const values: string | null = await this.cache.get(idKey);
    if (values === null) {
      return defaultValue;
    }

    const keysWithCounter = JSON.parse(values);
    const keys: string[] = Object.keys(keysWithCounter);
    const keyValues: number[] = uniqueArray<number>(
      Object.values(keysWithCounter),
    );

    const currentKeysCounters = keysWithCounter;
    const allKeysHaveSameCounter: boolean = keyValues.length === 1;
    const maxCounterIsAchieved: boolean = keyValues[0] === this.maxCounter;
    if (allKeysHaveSameCounter && maxCounterIsAchieved) {
      await this.initKeys(idKey, keys);
      keys.forEach((k: string) => {
        currentKeysCounters[k] = 0;
      });
    }

    let minKey = null;
    let minCounter = null;
    for (const key in currentKeysCounters) {
      if (minKey === null) {
        minKey = key;
        minCounter = currentKeysCounters[key];
        continue;
      }
      if (minCounter > currentKeysCounters[key]) {
        minKey = key;
        minCounter = currentKeysCounters[key];
      }
    }
    const resultKeysCounters = {};
    for (const key in currentKeysCounters) {
      if (key === minKey) {
        resultKeysCounters[key] = currentKeysCounters[key] + 1;
      } else {
        resultKeysCounters[key] = currentKeysCounters[key];
      }
    }
    await this.cache.set(idKey, JSON.stringify(resultKeysCounters));

    return minKey;
  }

  public async initKeys(idKey: string, keys: string[]) {
    const keysWithCounter = {};
    keys.forEach((k: string) => {
      keysWithCounter[k] = 0;
    });
    await this.cache.set(idKey, JSON.stringify(keysWithCounter));
  }
}
