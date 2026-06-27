import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ConfigService } from '@app/common/config/config.service'; 
import { TenantEntity } from 'apps/tenant-service/src/entities/tenant.entity'; 
import { ProviderEntity } from 'apps/provider-service/src/entities/provider.entity'; 
import { RequestLogEntity } from '@app/log/entities/request-log.entity'; 
import { UserEntity } from 'apps/user-service/src/entities/user.entity'; 
import { ApiEntity } from 'apps/api-service/src/entities/api.entity'; 
import { NotificationEntity } from 'apps/notification-service/src/entities/notification.entity'; 
import { WalletEntity } from 'apps/wallet-service/src/entities/wallet.entity'; 

export default new DataSource({
  type: 'postgres',
  host: ConfigService.config.postgress.POSTGRES_HOST,
  port: ConfigService.config.postgress.POSTGRES_PORT,
  username: ConfigService.config.postgress.POSTGRES_USER,
  password: ConfigService.config.postgress.POSTGRES_PASSWORD,
  database: ConfigService.config.postgress.POSTGRES_DB,
  entities: [
    TenantEntity,
    ProviderEntity,
    RequestLogEntity,
    UserEntity,
    ApiEntity,
    NotificationEntity,
    WalletEntity,
    // Add entities here
  ],

  migrations: ['src/modules/database/migrations/*.ts'],

  //only for development
  synchronize: true,

  logging: false,
});
