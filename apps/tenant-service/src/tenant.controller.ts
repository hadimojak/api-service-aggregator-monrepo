import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { TenantEntity } from './entities/tenant.entity';
import { ModifyResultDto } from '@app/common/dto/result-modify.dto'; 
import { CreateTenantDto } from '@app/common/dto/tenant-create.dto';
import { TenantFilterDto } from '@app/common/dto/tenant-filter.dto'; 


@Controller('user/tenant')
@ApiTags('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get()
  @ApiOperation({ summary: 'List providers (filterable)' })
  @ApiOkResponse({ type: TenantEntity, isArray: true })
  async providersInquiry(@Query() query: TenantFilterDto) {
    return this.tenantService.find(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get provider by id' })
  @ApiParam({ name: 'id', description: 'Provider UUID' })
  @ApiOkResponse({ type: TenantEntity })
  @ApiBadRequestResponse({ description: 'Invalid Provider ID format' })
  async providerInquiry(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid Provider ID format'),
      }),
    )
    id: string,
  ) {
    return this.tenantService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create provider' })
  @ApiCreatedResponse({ type: ModifyResultDto })
  async createProvider(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update provider (replace)' })
  @ApiParam({ name: 'id', description: 'Provider UUID' })
  @ApiOkResponse({ type: ModifyResultDto })
  @ApiBadRequestResponse({ description: 'Invalid Provider ID format' })
  async updateProvider(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid Provider ID format'),
      }),
    )
    id: string,
    @Body() createTenantDto: CreateTenantDto,
  ) {
    return this.tenantService.update(id, createTenantDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update provider (partial)' })
  @ApiParam({ name: 'id', description: 'Provider UUID' })
  @ApiOkResponse({ type: ModifyResultDto })
  @ApiBadRequestResponse({ description: 'Invalid Provider ID format' })
  async partialUpdateProvider(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid Provider ID format'),
      }),
    )
    id: string,
    @Body() partialUpdateTenantDto: Partial<CreateTenantDto>,
  ) {
    return this.tenantService.partialUpdate(id, partialUpdateTenantDto);
  }

  @Patch(':id/state')
  @ApiOperation({ summary: 'Update tenant status (toggle)' })
  @ApiParam({ name: 'id', description: 'tenant UUID' })
  @ApiOkResponse({ type: ModifyResultDto })
  @ApiBadRequestResponse({ description: 'Invalid Tenant ID format' })
  async changeState(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid Tenant ID format'),
      }),
    )
    id: string,
  ) {
    return this.tenantService.toggleState(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete provider (soft delete)' })
  @ApiParam({ name: 'id', description: 'Provider UUID' })
  @ApiOkResponse({ type: ModifyResultDto })
  @ApiBadRequestResponse({ description: 'Invalid Provider ID format' })
  async deleteProvider(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid Provider ID format'),
      }),
    )
    id: string,
  ) {
    return this.tenantService.remove(id);
  }
}
