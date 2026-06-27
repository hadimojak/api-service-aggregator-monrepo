import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestLogEntity } from './entities/request-log.entity';
import { LogService } from './log.service';
import { LogConsumer } from './consumers/log.consumer';

@Module({
  imports: [TypeOrmModule.forFeature([RequestLogEntity])],
  providers: [LogService],
  exports: [LogService],
  controllers: [LogConsumer],
})
export class LogModule {}
