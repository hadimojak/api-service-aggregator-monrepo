import { Module, DynamicModule } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@app/common/config/config.service';
import { ApiEntity } from '@app/log/entities/api.entity';
import { NotificationEntity } from '@app/log/entities/notification.entity';
import { ProviderEntity } from '@app/log/entities/provider.entity';
import { RequestLogEntity } from '@app/log/entities/request-log.entity';
import { TenantEntity } from '@app/log/entities/tenant.entity';
import { UserEntity } from '@app/log/entities/user.entity';
import { WalletEntity } from '@app/log/entities/wallet.entity';

@Module({})
export class DatabaseModule {
  static forRoot(serviceName: string): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: ConfigService.config.postgress.POSTGRES_HOST,
          port: ConfigService.config.postgress.POSTGRES_PORT,
          username: ConfigService.config.postgress.POSTGRES_USER,
          password: ConfigService.config.postgress.POSTGRES_PASSWORD,
          database: ConfigService.config.postgress.POSTGRES_DB,
          autoLoadEntities: true,
          synchronize: false,
          logging: false,
          retryAttempts: 10,
          retryDelay: 3000,
          entities: [
            ApiEntity,
            NotificationEntity,
            ProviderEntity,
            RequestLogEntity,
            TenantEntity,
            UserEntity,
            WalletEntity,
          ],
        }),
      ],
      providers: [
        { provide: 'DATABASE_SERVICE', useValue: serviceName },
        DatabaseService,
      ],
      exports: [TypeOrmModule],
    };
  }
}
