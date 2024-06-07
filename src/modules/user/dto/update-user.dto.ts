import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class RequestDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional({ description: '조회 기준 시간', required: false })
  timestamp: number = Date.now(); // default: 현재 timestamp

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: '조회 기준 잔액', required: false })
  balance = '0'; // default: "0"

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: '유저 ID', required: false })
  userId: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @ApiPropertyOptional({ description: '조회 내역 수 제한', required: false })
  limit = 5; // default: 5

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @ApiPropertyOptional({ description: '건너뛸 내역 수 제한', required: false })
  offset = 0; // default: 0
}
