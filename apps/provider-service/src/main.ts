import { NestFactory } from '@nestjs/core';
import { ProviderServiceModule } from './provider-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ProviderServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
