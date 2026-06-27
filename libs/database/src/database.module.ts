import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../../config/config.service';
import { ProviderEntity } from '../provider/entities/provider.entity';
import { TenantEntity } from '../tenant/entities/tenant.entity';
import { RequestLogEntity } from '../log/entities/request-log.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ApiEntity } from '../api/entities/api.entity';
import { NotificationEntity } from '../notification/entities/notification.entity';
import { WalletEntity } from '../wallet/entities/wallet.entity';

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
