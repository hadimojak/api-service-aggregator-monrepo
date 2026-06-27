import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'apps/user-service/src/entities/user.entity'; 
import { WalletEntity } from 'apps/wallet-service/src/entities/wallet.entity'; 
import { TenantEntity } from 'apps/tenant-service/src/entities/tenant.entity'; 
import { NotificationEntity } from 'apps/notification-service/src/entities/notification.entity'; 
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { ConfigService } from '@app/common/config/config.service'; 
import { StringValue } from 'ms';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      WalletEntity,
      TenantEntity,
      NotificationEntity,
    ]),
    PassportModule,
    JwtModule.register({
      secret: ConfigService.config.jwt.JWT_SECRET,
      signOptions: {
        expiresIn: ConfigService.config.jwt.JWT_EXPIRES_IN as StringValue,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
