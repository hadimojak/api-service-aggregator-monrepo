import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProviderEntity } from 'apps/provider-service/src/entities/provider.entity'; 
import { TenantEntity } from 'apps/tenant-service/src/entities/tenant.entity'; 

@Entity('api')
export class ApiEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    length: 255,
    unique: true,
  })
  name!: string;

  @Column({
    length: 500,
  })
  endpoint!: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  method!: string; // GET, POST, PUT, DELETE, etc.

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    default: true,
  })
  isActive!: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: Date;

  @ManyToOne(() => ProviderEntity, (provider) => provider.apis, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'providerId' })
  provider!: ProviderEntity;

  @Column()
  providerId!: string;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.apis, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'tenantId' })
  tenant!: TenantEntity;

  @Column()
  tenantId!: string;
}
