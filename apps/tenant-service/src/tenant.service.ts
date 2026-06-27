import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ILike,
  LessThanOrEqual,
  Not,
  QueryFailedError,
  Repository,
} from 'typeorm';
import { TenantEntity } from './entities/tenant.entity';
import { ModifyResultDto } from '@app/common/dto/result-modify.dto'; 
import { CreateTenantDto } from '@app/common/dto/tenant-create.dto'; 
import { TenantFilterDto } from '@app/common/dto/tenant-filter.dto'; 
import { PaginatedResult } from '@app/common/types/peginate-result.type'; 

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepo: Repository<TenantEntity>,
  ) {}

  async find(query: TenantFilterDto): Promise<PaginatedResult<TenantEntity>> {
    const where: any = {};

    if (query.apiKey) where.apiKey = ILike(`%${query.apiKey}%`);
    if (query.name) where.name = ILike(`%${query.name}%`);
    if (query.isActive !== undefined) where.isActive = query.isActive;
    if (query.rateLimitPerMin !== undefined && query.rateLimitPerMin !== null)
      where.rateLimitPerMin = LessThanOrEqual(Number(query.rateLimitPerMin));

    const page = query.page ?? 1;
    const limit = query.limit ?? 5;

    const [data, total] = await this.tenantRepo.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<TenantEntity> {
    const provider = await this.tenantRepo.findOne({ where: { id } });

    if (!provider) throw new NotFoundException(`Provider ${id} not found`);

    return provider;
  }

  async create(createDto: CreateTenantDto): Promise<ModifyResultDto> {
    try {
      const provider = this.tenantRepo.create(createDto);
      await this.tenantRepo.save(provider);
      return { result: { id: provider.id }, message: 'row created' };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError;

        if (driverError?.code === '23505') {
          throw new ConflictException(
            'Provider code or baseUrl already exists',
          );
        }
      }

      throw new BadRequestException('Failed to create provider');
    }
  }

  async update(
    id: string,
    updateDto: CreateTenantDto,
  ): Promise<ModifyResultDto> {
    const provider = await this.tenantRepo.findOneBy({ id });
    if (!provider) {
      throw new NotFoundException(`Provider ${id} not found`);
    }

    const duplicateCode = await this.tenantRepo.findOne({
      where: [
        { apiKey: updateDto.apiKey, id: Not(id) },
        { name: updateDto.name, id: Not(id) },
      ],
    });
    if (duplicateCode) {
      throw new NotFoundException(`Provider code duplication error`);
    }

    await this.tenantRepo.update(id, { ...updateDto, updatedAt: new Date() });
    return { result: { id }, message: 'row udpated' };
  }

  async partialUpdate(
    id: string,
    updateDto: Partial<CreateTenantDto>,
  ): Promise<ModifyResultDto> {
    const provider = await this.tenantRepo.preload({
      id,
      ...updateDto,
      updatedAt: new Date(),
    });
    if (!provider) {
      throw new NotFoundException(`Provider ${id} not found`);
    }

    const duplicateCode = await this.tenantRepo.findOne({
      where: [
        { apiKey: updateDto.apiKey, id: Not(id) },
        { name: updateDto.name, id: Not(id) },
      ],
    });
    if (duplicateCode) {
      throw new NotFoundException(`Provider code duplication error`);
    }

    await this.tenantRepo.save(provider);
    return { result: { id }, message: 'row partialy updated' };
  }

  async toggleState(id: string): Promise<ModifyResultDto> {
    const ternant = await this.tenantRepo.findOneBy({ id });
    if (!ternant) {
      throw new NotFoundException(`ternant ${id} not found`);
    }

    ternant.isActive = !ternant.isActive;

    await this.tenantRepo.save(ternant);
    return { result: { id }, message: 'row partialy updated' };
  }

  async remove(id: string): Promise<ModifyResultDto> {
    const provider = await this.tenantRepo.findOneBy({ id });

    if (!provider) {
      throw new NotFoundException(`Provider ${id} not found`);
    }

    await this.tenantRepo.softDelete(id);
    return { result: { id }, message: 'provider removed' };
  }
}
