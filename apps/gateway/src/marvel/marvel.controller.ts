import { AMQPAbstract, MarvelCharacterRepositoryAbstract } from '@abstracts';
import { Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Marvel')
@Controller('/marvel')
export class MarvelController {
  constructor(
    private readonly characterRepository: MarvelCharacterRepositoryAbstract,
    private readonly AMQPPublisher: AMQPAbstract,
  ) {}

  @Get('/characters/name/:name')
  @ApiParam({ name: 'name', type: String })
  getCharacterByName(@Param('name') name: string) {
    return this.characterRepository.getByName(name);
  }

  @Put('/characters/favorite/:id')
  @ApiParam({ name: 'id', type: Number })
  @ApiQuery({ name: 'email', type: String, description: 'Email to notify' })
  async setFavorite(@Param('id') id: number, @Query('email') email: string) {
    const data = await this.characterRepository.setFavorite(id);

    if (email)
      this.AMQPPublisher.sendEvent('character.favorite', {
        email,
        characterName: data.name,
      });

    return data;
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
