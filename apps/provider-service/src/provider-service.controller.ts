import { Controller, Get } from '@nestjs/common';
import { ProviderServiceService } from './provider-service.service';

@Controller()
export class ProviderServiceController {
  constructor(private readonly providerServiceService: ProviderServiceService) {}

  @Get()
  getHello(): string {
    return this.providerServiceService.getHello();
  }
}
