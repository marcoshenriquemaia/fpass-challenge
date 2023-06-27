import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailMicroserviceService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(data: any) {
    await this.mailerService.sendMail(data);
  }
}
