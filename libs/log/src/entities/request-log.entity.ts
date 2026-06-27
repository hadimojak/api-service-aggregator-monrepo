import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TenantEntity } from 'apps/tenant-service/src/entities/tenant.entity'; 

@Entity('request_log')
export class RequestLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  providerName!: string;

  @Column()
  endpoint!: string;

  @Column('json', { nullable: true })
  request: any;

  @Column('json', { nullable: true })
  response: any;

  @Column()
  status!: number;

  @Column()
  latency!: number;

  @Column({
    nullable: true,
  })
  errorMessage?: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.requestLogs, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'tenantId' })
  tenant!: TenantEntity;

  @Column()
  tenantId!: string;
}
