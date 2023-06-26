import { EncryptAbstract } from 'libs/abstracts';

export class HashService {
  constructor(private readonly encryptService: EncryptAbstract) {}

  public md5(value: string): string {
    return value;
  }
}
