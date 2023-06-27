import { MD5 } from 'crypto-js';

export class CryptoTsAdapter {
  md5(value: string) {
    return MD5(value).toString();
  }
}
