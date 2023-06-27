import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { MarvelController } from './marvel/marvel.controller';
import { MarvelService } from '@services';
import {
  AMQPAbstract,
  EncryptAbstract,
  InMemoryDBAbstract,
  MarvelCharacterRepositoryAbstract,
  RedisService,
} from '@abstracts';
import { CryptoTsAdapter, RabbitMQ } from '@adapters';
import { MarvelCharacterRepository } from 'libs/repositories';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}`,
          ],
          queue: 'email_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [GatewayController, MarvelController],
  providers: [
    GatewayService,
    {
      provide: AMQPAbstract,
      useClass: RabbitMQ,
    },
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
      provide: 'MARVEL_SERVICE',
      useClass: MarvelService,
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
