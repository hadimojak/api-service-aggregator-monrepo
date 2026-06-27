import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitmqModule],
  providers: [QueueService],
  exports: [QueueService, RabbitmqModule],
})
export class QueueModule {}
