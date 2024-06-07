import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

import { User } from '../entities/user.entity';

export class ResponseDto {
  @IsString()
  @ApiProperty({ description: 'msg' })
  msg: string;

  @ValidateNested({ each: true })
  @ApiPropertyOptional({ description: 'row', type: [User] })
  @Type(() => User)
  rows?: User[];
}
