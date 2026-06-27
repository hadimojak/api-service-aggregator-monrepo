import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from './entities/tenant.entity';
import { TenantController } from './tenant.controller';

@Module({
  providers: [TenantService],
  imports: [TypeOrmModule.forFeature([TenantEntity])],
  controllers: [TenantController],
  exports: [TenantService],
})
export class TenantModule {}
