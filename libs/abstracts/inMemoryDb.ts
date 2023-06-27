export abstract class InMemoryDBAbstract {
  abstract set(key: string, value: string): Promise<void>;
  abstract del(key: string): Promise<void>;
  abstract get(key: string): Promise<string | null>;
  abstract keys(pattern: string): Promise<string[]>;
  abstract mget(keys: string[]): Promise<string[]>;
}
