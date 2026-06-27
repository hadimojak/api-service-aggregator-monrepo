import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ApiEntity } from 'apps/api-service/src/entities/api.entity';

@Entity('provider')
export class ProviderEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    length: 255,
    unique: true,
  })
  code!: string;

  @Column()
  type!: string;

  @Column({ unique: true })
  baseUrl!: string;

  @Column()
  apiKey!: string;

  @Column({ default: 1 })
  priority!: number;

  @Column({
    default: true,
  })
  isActive!: boolean;

  @Column({
    default: 10000,
  })
  timeout!: number;

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

  @OneToMany(() => ApiEntity, (api) => api.provider)
  apis!: ApiEntity[];
}
