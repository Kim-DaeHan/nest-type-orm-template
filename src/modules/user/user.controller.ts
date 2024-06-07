import { Body, Controller, Get, HttpException, InternalServerErrorException, Logger, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServiceException } from 'src/errors/serviceException';

import { CreateDto } from './dto/create-user.dto';
import { ResponseDto } from './dto/response-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(UserController.name);

  @Post()
  @ApiOperation({
    summary: 'Create User Api',
  })
  @ApiBody({ type: CreateDto, description: 'Create User' })
  @ApiOkResponse({
    description: 'Create User Api',
    type: ResponseDto,
    isArray: false,
  })
  async create(
    // transform: true => 자동으로 타입 변환, 초기 값 정상 작동
    @Body() createDto: CreateDto,
  ): Promise<ResponseDto> {
    try {
      this.logger.log('Entering create UserController method');
      this.logger.log(`Received request with query parameters: ${JSON.stringify(createDto)}`);
      const response = await this.userService.create(createDto);
      return response;
    } catch (error) {
      this.logger.error(`Error in UserController create: ${error.message}`);
      if (!(error instanceof ServiceException)) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new HttpException(error.message, error.errorCode);
      }
    } finally {
      this.logger.log('Request completed for UserController create');
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Find All User Api',
  })
  @ApiOkResponse({
    description: 'Find All User Api',
    type: ResponseDto,
    isArray: true,
  })
  async findAll(): Promise<ResponseDto> {
    try {
      this.logger.log('Entering findAll UserController method');

      const response = await this.userService.findAll();
      return response;
    } catch (error) {
      this.logger.error(`Error in UserController find all: ${error.message}`);
      if (!(error instanceof ServiceException)) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new HttpException(error.message, error.errorCode);
      }
    } finally {
      this.logger.log('Request completed for UserController find all');
    }
  }
}
