import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderEntity } from './entities/provider.entity';
import { ProviderController } from './provider.controller';

@Module({
  imports: [ TypeOrmModule.forFeature([ProviderEntity])],
  providers: [ProviderService],
  exports: [ProviderService],
  controllers: [ProviderController],
})
export class ProviderModule {}
