import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'apps/user-service/src/entities/user.entity'; 
import { NotificationEntity } from 'apps/notification-service/src/entities/notification.entity'; 
import { RequestLogEntity } from '@app/log/entities/request-log.entity'; 
import { ApiEntity } from 'apps/api-service/src/entities/api.entity'; 

@Entity('tenant')
export class TenantEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    length: 255,
  })
  name!: string;

  @Column({
    unique: true,
  })
  apiKey!: string;

  @Column({
    default: true,
  })
  isActive!: boolean;

  @Column({ default: 100 })
  rateLimitPerMin!: number;

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

  @OneToOne(() => UserEntity, (user) => user.tenant, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @Column()
  userId!: string;

  @OneToMany(() => NotificationEntity, (notification) => notification.tenant)
  notifications!: NotificationEntity[];

  @OneToMany(() => RequestLogEntity, (requestLog) => requestLog.tenant)
  requestLogs!: RequestLogEntity[];

  @OneToMany(() => ApiEntity, (api) => api.tenant)
  apis!: ApiEntity[];
}
