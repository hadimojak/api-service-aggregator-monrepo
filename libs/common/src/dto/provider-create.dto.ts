import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsOptional,
  IsUrl,
  Min,
  Max,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProviderDto {
  @ApiProperty({ description: 'Unique code identifier', example: 'PAYPAL_01' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  code!: string;

  @ApiProperty({ description: 'Type of the provider', example: 'payment' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  type!: string;

  @ApiProperty({ description: 'Base URL for the provider API' })
  // @IsUrl()
  @IsNotEmpty()
  baseUrl!: string;

  @ApiProperty({ description: 'API Key for authentication' })
  @IsString()
  @IsNotEmpty()
  apiKey!: string;

  @ApiPropertyOptional({
    description: 'Higher numbers have higher priority',
  })
  @IsInt()
  @IsOptional()
  @Min(1)
  priority?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Timeout in ms' })
  @IsInt()
  @IsOptional()
  @Min(100)
  @Transform(({ value }) => Number(value))
  timeout?: number;

  
}
