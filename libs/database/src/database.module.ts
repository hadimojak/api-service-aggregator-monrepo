import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@app/common/config/config.service'; 
import { ProviderEntity } from 'apps/provider-service/src/entities/provider.entity'; 
import { TenantEntity } from 'apps/tenant-service/src/entities/tenant.entity'; 
import { RequestLogEntity } from '@app/log/entities/request-log.entity'; 
import { UserEntity } from 'apps/user-service/src/entities/user.entity'; 
import { ApiEntity } from 'apps/api-service/src/entities/api.entity'; 
import { NotificationEntity } from 'apps/notification-service/src/entities/notification.entity'; 
import { WalletEntity } from 'apps/wallet-service/src/entities/wallet.entity'; 

@Module({
  providers: [DatabaseService],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: ConfigService.config.postgress.POSTGRES_HOST,
        port: ConfigService.config.postgress.POSTGRES_PORT,
        username: ConfigService.config.postgress.POSTGRES_USER,
        password: ConfigService.config.postgress.POSTGRES_PASSWORD,
        database: ConfigService.config.postgress.POSTGRES_DB,
        entities: [
          ProviderEntity,
          TenantEntity,
          RequestLogEntity,
          UserEntity,
          ApiEntity,
          NotificationEntity,
          WalletEntity,
        ],
        synchronize: true,
        logging: false,
        retryAttempts: 10,
        retryDelay: 3000,
      }),
    }),
  ],
})
export class DatabaseModule {}
