import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsOptional,
  Length,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({
    description: 'The display name of the tenant',
    example: 'Acme Corp',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  @Transform(({ value }) => value?.trim())
  name!: string;

  @ApiProperty({ description: 'API Key for tenant authentication' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  apiKey!: string;

  @ApiPropertyOptional({
    description: 'Whether the tenant is active',
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  isActive!: boolean;

  @ApiPropertyOptional({ description: 'Rate limit per minute' })
  @IsInt()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => Number(value))
  rateLimitPerMin!: number;
}
