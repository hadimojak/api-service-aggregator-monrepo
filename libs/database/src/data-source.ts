import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ConfigService } from '@app/common/config/config.service'; 
import { TenantEntity } from '@app/log/entities/tenant.entity'; 
import { ProviderEntity } from '@app/log/entities/provider.entity'; 
import { RequestLogEntity } from '@app/log/entities/request-log.entity'; 
import { UserEntity } from '@app/log/entities/user.entity'; 
import { ApiEntity } from '@app/log/entities/api.entity'; 
import { NotificationEntity } from '@app/log/entities/notification.entity'; 
import { WalletEntity } from '@app/log/entities/wallet.entity'; 

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
