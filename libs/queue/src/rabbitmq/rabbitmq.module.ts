import { Module } from '@nestjs/common';
import {
  ClientProxyFactory,
  ClientProxy,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@app/common/config/config.service'; 
import { RabbitmqService } from './rabbitmq.service';
import { LogModule } from '@app/log/log.module'; 

@Module({
  providers: [
    {
      provide: ConfigService.config.rabbitmq.serviceName,
      useFactory: (): ClientProxy =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,

          options: {
            urls: [
              `amqp://${ConfigService.config.rabbitmq.user}:${ConfigService.config.rabbitmq.password}@${ConfigService.config.rabbitmq.host}:${ConfigService.config.rabbitmq.port}`,
            ],
            queue: ConfigService.config.rabbitmq.requestLogQueue,
            queueOptions: { durable: true },
            noAck: true,
          },
        }),
    },
    RabbitmqService,
  ],
  exports: [RabbitmqService],
  imports: [LogModule],
})
export class RabbitmqModule {}
