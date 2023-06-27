import { MarvelCharacterRepositoryAbstract } from '@abstracts';
import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Marvel')
@Controller('/marvel')
export class MarvelController {
  constructor(
    private readonly characterRepository: MarvelCharacterRepositoryAbstract,
  ) {}

  @Get('/characters/name/:name')
  @ApiParam({ name: 'name', type: String })
  getCharacterByName(@Param('name') name: string) {
    return this.characterRepository.getByName(name);
  }

  @Put('/characters/favorite/:id')
  @ApiParam({ name: 'id', type: Number })
  setFavorite(@Param('id') id: number) {
    return this.characterRepository.setFavorite(id);
  }

  @Get('/characters/favorite/:id')
  @ApiParam({ name: 'id', type: Number })
  getFavorite(@Param('id') id: number) {
    return this.characterRepository.getFavorite(id);
  }

  @Get('/characters/favorite')
  listFavorites() {
    return this.characterRepository.listFavorites();
  }

  @Delete('/characters/favorite/:id')
  @ApiParam({ name: 'id', type: Number })
  removeFavorite(@Param('id') id: number) {
    return this.characterRepository.removeFavorite(id);
  }
}
