import {
  InMemoryDBAbstract,
  MarvelCharacterRepositoryAbstract,
} from '@abstracts';
import { Inject } from '@nestjs/common';
import { MarvelService } from '@services';

export class MarvelCharacterRepository
  implements MarvelCharacterRepositoryAbstract
{
  constructor(
    @Inject('MARVEL_SERVICE') private readonly marvelService: MarvelService,
    private readonly redisService: InMemoryDBAbstract,
  ) {}

  async getByName(name: string) {
    const data = await this.marvelService.getCharacterByName(name);

    return data;
  }

  async getFavorite(id: number) {
    const data = await this.redisService.get(`marvel:${id}`);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  }

  async setFavorite(id: number) {
    const data = await this.marvelService.getCharacterById(id);

    await this.redisService.set(`marvel:${id}`, JSON.stringify(data));

    return data;
  }

  async removeFavorite(id: number): Promise<'OK'> {
    await this.redisService.del(`marvel:${id}`);

    return 'OK';
  }

  async listFavorites() {
    const keys = await this.redisService.keys('marvel:*');

    if (!keys.length) return [];

    const data = await this.redisService.mget(keys);

    return data.map((item) => JSON.parse(item));
  }

  async list() {
    const data = await this.marvelService.getCharacterByName('');

    return data;
  }
}
