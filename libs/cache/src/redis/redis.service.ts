import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@app/common/config/config.service'; 
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    super({
      host: ConfigService.config.redis.host,
      port: ConfigService.config.redis.port,
      password: ConfigService.config.redis.password,
      lazyConnect: true,
    });

    this.on('connect', () => {
      this.logger.verbose('Redis connected');
    });

    this.on('ready', () => {
      this.logger.verbose('Redis ready');
    });

    this.on('error', (err) => {
      this.logger.fatal(`Redis error: ${err.message}`, err.stack);
    });

    this.on('close', () => {
      this.logger.verbose('Redis connection closed');
    });
  }

  async onModuleDestroy() {
    await this.quit();
  }

  async checkConnection(): Promise<void> {
    if (this.status !== 'ready') {
      await this.connect();
    }

    const response = await this.ping();
    if (response !== 'PONG') {
      throw new Error(`Redis ping failed with response: ${response}`);
    }
  }
}
