import { Inject } from '@nestjs/common';

export class MarvelService {
  constructor(
    @Inject('MARVEL_PRIVATE_KEY') private readonly privateKey: string,
    @Inject('MARVEL_PUBLIC_KEY') private readonly publicKey: string,
  ) {}
}
