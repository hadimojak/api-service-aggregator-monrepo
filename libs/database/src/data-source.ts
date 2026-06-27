import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ConfigService } from '../../config/config.service';
import { TenantEntity } from '../tenant/entities/tenant.entity';
import { ProviderEntity } from '../provider/entities/provider.entity';
import { RequestLogEntity } from '../log/entities/request-log.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ApiEntity } from '../api/entities/api.entity';
import { NotificationEntity } from '../notification/entities/notification.entity';
import { WalletEntity } from '../wallet/entities/wallet.entity';

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
