import { Injectable, Inject, Logger, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(
    private readonly dataSource: DataSource,
    @Inject('DATABASE_SERVICE')
    private readonly serviceName: string,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.dataSource.query('SELECT 1');
    } catch (error) {
      this.logger.error(
        `[${this.serviceName}] Database connection failed`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }
}
