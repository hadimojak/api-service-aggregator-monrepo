import {
  Injectable,
  Inject,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@app/common/config/config.service';
import { LogService } from '@app/log/log.service';

@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitmqService.name);

  constructor(
    @Inject(ConfigService.config.rabbitmq.serviceName)
    private readonly client: ClientProxy,
    private readonly logService: LogService,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.client.connect();
    } catch (error) {
      this.logger.error(
        'RabbitMQ connection failed',
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.close();
  }

  async publish<T>(queue: string, payload: T): Promise<void> {
    await lastValueFrom(this.client.emit(queue, payload));
  }
}
