import { Module } from '@nestjs/common';
import { EmailMicroserviceController } from './email-microservice.controller';
import { EmailMicroserviceService } from './email-microservice.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        secure: false,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        ignoreTLS: true,
      },
      defaults: {
        from: '"',
      },
    }),
  ],
  controllers: [EmailMicroserviceController],
  providers: [EmailMicroserviceService],
})
export class EmailMicroserviceModule {}
