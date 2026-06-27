import { ApiProperty } from '@nestjs/swagger';

export class ModifyResultDto {
  @ApiProperty({ example: { id: '0f1a4b7a-6ed4-4af8-8f3f-6b7e0b1f8f2a' } })
  result!: { id: string };

  @ApiProperty({ example: 'row created' })
  message!: string;
}
