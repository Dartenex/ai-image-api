export interface CacheDriverInterface {
  get<T>(key: string): Promise<T>;
  set(key: string, value: string): Promise<void>;
}
