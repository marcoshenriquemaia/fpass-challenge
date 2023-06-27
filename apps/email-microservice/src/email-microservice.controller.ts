import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EmailMicroserviceService } from './email-microservice.service';

@Controller()
export class EmailMicroserviceController {
  constructor(private readonly appService: EmailMicroserviceService) {}

  @EventPattern('character.favorite')
  async notifyFavoriteCharacter(data: {
    email: string;
    characterName: string;
  }) {
    console.log('Event received');
    await this.appService.sendEmail({
      to: data.email,
      from: 'FPass Challenge',
      subject: 'New favorite character!',
      text: `You favorite ${data.characterName}!`,
    });
    console.log(`Email sent to ${data.email}`);
    return 1;
  }
}
