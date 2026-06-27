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
import { ProviderEntity } from '@app/log/entities/provider.entity'; 
import { CreateProviderDto } from '@app/common/dto/provider-create.dto'; 
import { ModifyResultDto } from '@app/common/dto/result-modify.dto';
import { ProviderFilterDto } from '@app/common/dto/provider-filtere.dto'; 
import { PaginatedResult } from '@app/common/types/peginate-result.type';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(ProviderEntity)
    private readonly providerRepo: Repository<ProviderEntity>,
  ) {}

  async find(
    query: ProviderFilterDto,
  ): Promise<PaginatedResult<ProviderEntity>> {
    const where: any = {};

    if (query.code) where.code = ILike(`%${query.code}%`);
    if (query.type) where.type = ILike(`%${query.type}%`);
    if (query.baseUrl) where.baseUrl = ILike(`%${query.baseUrl}%`);
    if (query.apiKey) where.apiKey = ILike(`%${query.apiKey}%`);
    if (query.isActive !== undefined) where.isActive = query.isActive;
    if (query.timeout !== undefined && query.timeout !== null)
      where.timeout = LessThanOrEqual(Number(query.timeout));

    const page = query.page || 1;
    const limit = query.limit || 5;

    const [data, total] = await this.providerRepo.findAndCount({
      where,
      order: { baseUrl: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<ProviderEntity> {
    const provider = await this.providerRepo.findOne({ where: { id } });

    if (!provider) throw new NotFoundException(`Provider ${id} not found`);

    return provider;
  }

  async create(createDto: CreateProviderDto): Promise<ModifyResultDto> {
    try {
      const provider = this.providerRepo.create(createDto);
      await this.providerRepo.save(provider);
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
    updateDto: CreateProviderDto,
  ): Promise<ModifyResultDto> {
    const provider = await this.providerRepo.findOneBy({ id });
    if (!provider) {
      throw new NotFoundException(`Provider ${id} not found`);
    }

    const duplicateCode = await this.providerRepo.findOne({
      where: [
        { code: updateDto.code, id: Not(id) },
        { baseUrl: updateDto.baseUrl, id: Not(id) },
      ],
    });
    if (duplicateCode) {
      throw new NotFoundException(`Provider code duplication error`);
    }

    await this.providerRepo.update(id, { ...updateDto, updatedAt: new Date() });
    return { result: { id }, message: 'row udpated' };
  }

  async partialUpdate(
    id: string,
    updateDto: Partial<CreateProviderDto>,
  ): Promise<ModifyResultDto> {
    const provider = await this.providerRepo.preload({
      id,
      ...updateDto,
      updatedAt: new Date(),
    });
    if (!provider) {
      throw new NotFoundException(`Provider ${id} not found`);
    }

    const duplicateCode = await this.providerRepo.findOne({
      where: [
        { code: updateDto.code, id: Not(id) },
        { baseUrl: updateDto.baseUrl, id: Not(id) },
      ],
    });
    if (duplicateCode) {
      throw new NotFoundException(`Provider code duplication error`);
    }

    await this.providerRepo.save(provider);
    return { result: { id }, message: 'row partialy updated' };
  }

  async toggleState(id: string): Promise<ModifyResultDto> {
    const provider = await this.providerRepo.findOneBy({ id });
    if (!provider) {
      throw new NotFoundException(`Provider ${id} not found`);
    }

    provider.isActive = !provider.isActive;

    await this.providerRepo.save(provider);
    return { result: { id }, message: 'row partialy updated' };
  }

  async remove(id: string): Promise<ModifyResultDto> {
    const provider = await this.providerRepo.findOneBy({ id });

    if (!provider) {
      throw new NotFoundException(`Provider ${id} not found`);
    }

    await this.providerRepo.softDelete(id);
    return { result: { id }, message: 'provider removed' };
  }
}
