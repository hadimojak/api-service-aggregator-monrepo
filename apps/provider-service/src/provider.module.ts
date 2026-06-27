import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@app/database';
import { ProviderEntity } from '@app/log/entities/provider.entity'; 
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { RedisModule } from '@app/cache/redis/redis.module';
import { RabbitmqModule } from '@app/queue/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    DatabaseModule.forRoot('provider-service'),
    RedisModule.forRoot('provider-service'),
    TypeOrmModule.forFeature([ProviderEntity]),
    RabbitmqModule,
  ],
  providers: [ProviderService],
  exports: [ProviderService],
  controllers: [ProviderController],
})
export class ProviderModule {}
