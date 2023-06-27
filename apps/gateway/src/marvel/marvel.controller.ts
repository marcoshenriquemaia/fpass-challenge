import { MarvelCharacterRepositoryAbstract } from '@abstracts';
import { Controller, Get, Param } from '@nestjs/common';
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
}
