import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService extends Redis {
  constructor(
    @Inject('REDIS_HOST') readonly redisHost: string,
    @Inject('REDIS_PORT') readonly redisPort: string,
  ) {
    super({
      host: redisHost,
      port: Number(redisPort),
    });

    super.on('connect', () => {
      console.log('Redis connected');
    });

    super.on('error', (error) => {
      console.log('Redis error', error);
    });
  }
}
