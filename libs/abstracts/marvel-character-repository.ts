import { MarvelCharacter } from '@interfaces';

export abstract class MarvelCharacterRepositoryAbstract {
  abstract list(): Promise<MarvelCharacter[]>;
  abstract getByName(name: string): Promise<MarvelCharacter[]>;
  abstract getFavorite(id: number): Promise<MarvelCharacter>;
  abstract setFavorite(id: number): Promise<MarvelCharacter>;
  abstract removeFavorite(id: number): Promise<'OK'>;
  abstract listFavorites(): Promise<MarvelCharacter[]>;
}
