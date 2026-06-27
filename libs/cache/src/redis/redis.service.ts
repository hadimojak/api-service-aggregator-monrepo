import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@app/common/config/config.service';
import Redis from 'ioredis';

@Injectable()
export class RedisService
  extends Redis
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(RedisService.name);

  constructor(
    @Inject('REDIS_SERVICE_NAME')
    private readonly serviceName: string,
  ) {
    super({
      host: ConfigService.config.redis.host,
      port: ConfigService.config.redis.port,
      password: ConfigService.config.redis.password,
      lazyConnect: true,
    });

    this.on('error', (err) => {
      this.logger.error(`Redis error: ${err.message}`, err.stack);
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      if (this.status !== 'ready') {
        await this.connect();
      }

      const response = await this.ping();
      if (response !== 'PONG') {
        throw new Error(`Redis ping failed with response: ${response}`);
      }
    } catch (error) {
      this.logger.error(
        `[${this.serviceName}] Redis connection failed`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.quit();
  }
}
