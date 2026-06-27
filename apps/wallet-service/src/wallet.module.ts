import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from '@app/log/entities/wallet.entity'; 

@Module({
  controllers: [WalletController],
  imports: [TypeOrmModule.forFeature([WalletEntity])],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
