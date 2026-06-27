import {
  IsString,
  IsOptional,
  IsInt,
  IsObject,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRequestLogDto {
  @ApiProperty({ example: 'tenant_123' })
  @IsString()
  tenantId!: string;

  @ApiProperty({ example: 'PAYPAL' })
  @IsString()
  providerName!: string;

  @ApiProperty({ example: '/v1/payment' })
  @IsString()
  endpoint!: string;

  @ApiPropertyOptional({
    example: { amount: 100, currency: 'USD' },
  })
  @IsOptional()
  @IsObject()
  request?: any;

  @ApiPropertyOptional({
    example: { transactionId: 'abc123', status: 'success' },
  })
  @IsOptional()
  @IsObject()
  response?: any;

  @ApiProperty({ example: 200 })
  @IsInt()
  @Min(100)
  status!: number;

  @ApiProperty({ example: 350 })
  @IsInt()
  @Min(0)
  latency!: number;

  @ApiPropertyOptional({ example: 'Timeout error' })
  @IsOptional()
  @IsString()
  errorMessage?: string;
}
