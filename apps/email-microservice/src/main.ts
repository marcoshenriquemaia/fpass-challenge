import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { EmailMicroserviceModule } from './email-microservice.module';

async function bootstrap() {
  const configService = new ConfigService();

  const USER = configService.get('RABBITMQ_USER');
  const PASSWORD = configService.get('RABBITMQ_PASS');
  const HOST = configService.get('RABBITMQ_HOST');
  const PORT = configService.get('RABBITMQ_PORT');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EmailMicroserviceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${USER}:${PASSWORD}@${HOST}:${PORT}`],
        queue: 'email_queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  app.listen();
}
bootstrap();
