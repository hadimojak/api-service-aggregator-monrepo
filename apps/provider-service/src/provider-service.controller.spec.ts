import { Test, TestingModule } from '@nestjs/testing';
import { ProviderServiceController } from './provider-service.controller';
import { ProviderServiceService } from './provider-service.service';

describe('ProviderServiceController', () => {
  let providerServiceController: ProviderServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProviderServiceController],
      providers: [ProviderServiceService],
    }).compile();

    providerServiceController = app.get<ProviderServiceController>(ProviderServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(providerServiceController.getHello()).toBe('Hello World!');
    });
  });
});
