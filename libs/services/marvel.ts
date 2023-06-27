import { EncryptAbstract } from '@abstracts';
import { MarvelCharacter } from '@interfaces';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';

export class MarvelService {
  private credentialsParams: string;
  private readonly baseUrl = 'https://gateway.marvel.com:443';

  constructor(
    @Inject('MARVEL_PRIVATE_KEY') private readonly privateKey: string,
    @Inject('MARVEL_PUBLIC_KEY') private readonly publicKey: string,
    private readonly encrypt: EncryptAbstract,
  ) {
    const ts = Date.now();
    const md5 = this.encrypt.md5(`${ts}${this.privateKey}${this.publicKey}`);
    this.credentialsParams = `ts=${ts}&apikey=${this.publicKey}&hash=${md5}`;
  }

  async getCharacterByName(name: string): Promise<MarvelCharacter[]> {
    const response = await fetch(
      `${this.baseUrl}/v1/public/characters?nameStartsWith=${name}&${this.credentialsParams}`,
    );

    const data = await response.json();

    if (data.code !== 200) {
      throw new HttpException(data.message, HttpStatus.BAD_REQUEST);
    }

    if (!data.data.results.length) {
      throw new HttpException('Character not found', HttpStatus.NOT_FOUND);
    }

    return data.data.results;
  }

  async getCharacterById(id: number): Promise<MarvelCharacter> {
    const response = await fetch(
      `${this.baseUrl}/v1/public/characters/${id}?${this.credentialsParams}`,
    );

    const data = await response.json();

    if (data.code !== 200) {
      throw new HttpException(data.message, HttpStatus.BAD_REQUEST);
    }

    if (!data.data.results.length) {
      throw new HttpException('Character not found', HttpStatus.NOT_FOUND);
    }

    return data.data.results[0];
  }
}
