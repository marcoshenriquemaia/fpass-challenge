import * as crypto from 'crypto-js';

export class CryptoTsAdapter {
  md5(value: string) {
    return crypto.MD5(value).toString();
  }
}
