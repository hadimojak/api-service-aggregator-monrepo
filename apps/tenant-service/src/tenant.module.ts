import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from '@app/log/entities/tenant.entity';
import { RequestLogEntity } from '@app/log/entities/request-log.entity';
import { TenantController } from './tenant.controller';

@Module({
  providers: [TenantService],
  imports: [TypeOrmModule.forFeature([RequestLogEntity, TenantEntity])],
  controllers: [TenantController],
  exports: [TenantService],
})
export class TenantModule {}
