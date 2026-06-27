import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';
import {
  UserEntity,
  UserRole,
} from '@app/log/entities/user.entity';
import { TenantEntity } from '@app/log/entities/tenant.entity';
import { WalletEntity } from '@app/log/entities/wallet.entity';
import {
  AuthResponseDto,
  LoginDto,
  RefreshTokenDto,
  SignupDto,
} from './dto/index';
import { ConfigService } from '@app/common/config/config.service';
import { StringValue } from 'ms';
import {
  NotificationEntity,
  NotificationType,
} from '@app/log/entities/notification.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(TenantEntity)
    private readonly tenantRepo: Repository<TenantEntity>,
    @InjectRepository(WalletEntity)
    private readonly walletRepo: Repository<WalletEntity>,
    @InjectRepository(NotificationEntity)
    private readonly notificationRepo: Repository<NotificationEntity>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  async signup(signupDto: SignupDto): Promise<AuthResponseDto> {
    const { email, password, phoneNumber, role } = signupDto;

    const existingUser = await this.userRepo.findOne({
      where: [{ email }, { phoneNumber }],
    });

    if (existingUser)
      throw new ConflictException('email or phone already exict');

    const passwordHash = await bcrypt.hash(password, 10);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = this.userRepo.create({
        email,
        phoneNumber,
        passwordHash,
        role: role as UserRole,
        isActive: true,
        refreshTokenHash: null,
      });

      await queryRunner.manager.save(user);

      if (role === UserRole.TENANT) {
        const tenant = this.tenantRepo.create({
          name: `${email}-tenant`,
          apiKey: this.generateApiKey(),
          isActive: true,
          rateLimitPerMin: 100,
          user,
          userId: user.id,
        });

        await queryRunner.manager.save(tenant);

        user.tenant = tenant;
        user.tenantId = tenant.id;
        await queryRunner.manager.save(user);

        const welcomeNotification = this.notificationRepo.create({
          title: 'Welcome!',
          message: `Your tenant account has been created successfully. API key is ready to use.`,
          type: NotificationType.INFO,
          isRead: false,
          tenant,
          tenantId: tenant.id,
        });

        await queryRunner.manager.save(welcomeNotification);
      }

      const wallet = this.walletRepo.create({
        balance: 0,
        currency: 'IRI',
        isActive: true,
        user,
        userId: user.id,
      });

      await queryRunner.manager.save(wallet);

      user.wallet = wallet;
      user.walletId = wallet.id;
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();

      const { accessToken, refreshToken } = await this.generateTokens(
        user.id,
        user.email,
        user.role,
      );
      await this.updateRefreshToken(user.id, refreshToken);

      return {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          isActive: user.isActive,
        },
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { emailOrPhone, password } = loginDto;

    const user = await this.userRepo.findOne({
      where: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });

    if (!user) throw new UnauthorizedException('invalid credentials');

    if (!user.isActive) throw new UnauthorizedException('Account is inactive');

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const { accessToken, refreshToken } = await this.generateTokens(
      user.id,
      user.email,
      user.role,
    );
    await this.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isActive: user.isActive,
      },
    };
  }

  async logout(userId: string): Promise<void> {
    await this.userRepo.update(userId, { refreshTokenHash: null });
  }

  async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<AuthResponseDto> {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Access denied');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash,
    );
    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Access denied');
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, newRefreshToken);

    return {
      accessToken,
      refreshToken: newRefreshToken,
      user: {
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isActive: user.isActive,
      },
    };
  }

  async validateUser(userId: string): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user || !user.isActive) {
      return null;
    }
    return user;
  }

  private async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepo.update(userId, {
      refreshTokenHash: hashedRefreshToken,
    });
  }

  private async generateTokens(userId: string, email: string, role: UserRole) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, role },
        {
          secret: ConfigService.config.jwt.JWT_SECRET,
          expiresIn: ConfigService.config.jwt.JWT_EXPIRES_IN as StringValue,
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email, role },
        {
          secret: ConfigService.config.jwt.JWT_REFRESH_SECRET,
          expiresIn: ConfigService.config.jwt
            .JWT_REFRESH_EXPIRES_IN as StringValue,
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  private generateApiKey(): string {
    return `sk_${randomBytes(32).toString('hex')}`;
  }
}
