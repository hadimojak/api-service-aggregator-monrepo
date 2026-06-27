import { DynamicModule, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({})
export class RedisModule {
  static forRoot(serviceName: string): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: 'REDIS_SERVICE_NAME',
          useValue: serviceName,
        },
        RedisService,
      ],
      exports: [RedisService],
    };
  }
}
