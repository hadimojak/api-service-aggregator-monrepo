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
import { ProviderService } from './provider.service';
import { CreateProviderDto } from '@app/common/dto/provider-create.dto'; 
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ProviderEntity } from './entities/provider.entity';
import { ModifyResultDto } from '@app/common/dto/result-modify.dto'; 
import { ProviderFilterDto } from '@app/common/dto/provider-filtere.dto'; 

@Controller('admin/provider')
@ApiTags('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  @ApiOperation({ summary: 'List providers (filterable)' })
  @ApiOkResponse({ type: ProviderEntity, isArray: true })
  async providersInquiry(
    @Query() query: ProviderFilterDto,
  ) {
    return this.providerService.find(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get provider by id' })
  @ApiParam({ name: 'id', description: 'Provider UUID' })
  @ApiOkResponse({ type: ProviderEntity })
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
    return this.providerService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create provider' })
  @ApiCreatedResponse({ type: ModifyResultDto })
  async createProvider(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
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
    @Body() updateProviderDto: CreateProviderDto,
  ) {
    return this.providerService.update(id, updateProviderDto);
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
    @Body() partialUpdateProviderDto: Partial<CreateProviderDto>,
  ) {
    return this.providerService.partialUpdate(id, partialUpdateProviderDto);
  }
  
  @Patch(':id/state')
  @ApiOperation({ summary: 'Update provider status (toggle)' })
  @ApiParam({ name: 'id', description: 'Provider UUID' })
  @ApiOkResponse({ type: ModifyResultDto })
  @ApiBadRequestResponse({ description: 'Invalid Provider ID format' })
  async changeState(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid Provider ID format'),
      }),
    )
    id: string,
  ) {
    return this.providerService.toggleState(id);
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
    return this.providerService.remove(id);
  }
}
