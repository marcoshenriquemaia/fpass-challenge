import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { MarvelController } from './marvel/marvel.controller';
import { MarvelService } from '@services';
import {
  EncryptAbstract,
  InMemoryDBAbstract,
  MarvelCharacterRepositoryAbstract,
} from '@abstracts';
import { CryptoTsAdapter, RedisService } from '@adapters';
import { MarvelCharacterRepository } from 'libs/repositories';

@Module({
  imports: [],
  controllers: [GatewayController, MarvelController],
  providers: [
    GatewayService,
    MarvelService,
    {
      provide: EncryptAbstract,
      useClass: CryptoTsAdapter,
    },
    {
      provide: InMemoryDBAbstract,
      useClass: RedisService,
    },
    {
      provide: MarvelCharacterRepositoryAbstract,
      useClass: MarvelCharacterRepository,
    },
    {
      provide: 'MARVEL_PRIVATE_KEY',
      useValue: process.env.MARVEL_PRIVATE_KEY,
    },
    {
      provide: 'MARVEL_PUBLIC_KEY',
      useValue: process.env.MARVEL_PUBLIC_KEY,
    },
    {
      provide: 'REDIS_HOST',
      useValue: process.env.REDIS_HOST,
    },
    {
      provide: 'REDIS_PORT',
      useValue: process.env.REDIS_PORT,
    },
  ],
})
export class GatewayModule {}
