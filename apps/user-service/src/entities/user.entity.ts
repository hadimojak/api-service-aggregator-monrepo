import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TenantEntity } from 'apps/tenant-service/src/entities/tenant.entity'; 
import { WalletEntity } from 'apps/wallet-service/src/entities/wallet.entity'; 

export enum UserRole {
  ADMIN = 'admin',
  TENANT = 'tenant',
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({ length: 10, unique: true })
  phoneNumber!: string;

  @Column({ length: 255 })
  passwordHash!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TENANT,
  })
  role!: UserRole;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  refreshTokenHash!: string | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: Date;

  @OneToOne(() => TenantEntity, (tenant) => tenant.user, {
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'tenantId' })
  tenant?: TenantEntity | null;

  @Column({ nullable: true })
  tenantId!: string;

  @OneToOne(() => WalletEntity, (wallet) => wallet.user, {
    nullable: true,
  })
  @JoinColumn({ name: 'walletId' })
  wallet?: WalletEntity;

  @Column({ nullable: true })
  walletId!: string;
}
