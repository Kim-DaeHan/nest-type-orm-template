import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: '유저 지갑주소', required: false })
  walletAddr: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: '유저 닉네임', required: false })
  nickName: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: '유저 email', required: false })
  email: string;
}
