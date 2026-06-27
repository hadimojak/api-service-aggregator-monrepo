import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { LogService } from '../log.service'; 
import type { CreateRequestLogDto } from '@app/common/dto/request-create-log.dto'; 

@Controller()
export class LogConsumer {
  private readonly logger = new Logger(LogConsumer.name);

  constructor(private readonly logService: LogService) {}

  @EventPattern('request-log')
  async handleRequestLog(
    @Payload()
    payload: CreateRequestLogDto,
    @Ctx()
    context: RmqContext,
  ) {
    const channel = context.getChannelRef();

    const message = context.getMessage();

    try {
      await this.logService.createLog(payload);

      channel.ack(message);

      this.logger.verbose('request log saved');
    } catch (error) {
      this.logger.error(
        'Request log failed',
        error instanceof Error ? error.stack : String(error),
      );

      channel.nack(message, false, true);
    }
  }
}
