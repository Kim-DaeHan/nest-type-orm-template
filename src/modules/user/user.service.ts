import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceException } from 'src/errors/serviceException';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

import type { CreateDto } from './dto/create-user.dto';
import type { ResponseDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  private readonly logger = new Logger(UserService.name);

  async create(createDto: CreateDto): Promise<ResponseDto> {
    this.logger.log('Entering create UserService method');

    const { email } = createDto;

    if (!email) {
      this.logger.error('Invalid input parameters');
      throw new ServiceException(400, 'Invalid input parameters');
    }

    const newUser = this.userRepository.create(createDto);
    await this.userRepository.save(newUser);

    const result = {
      msg: 'success',
    };

    this.logger.log(`Returning response: ${JSON.stringify(result)}`);

    return result;
  }

  async findAll(): Promise<ResponseDto> {
    this.logger.log('Entering findAll UserService method');

    const rows = await this.userRepository.find({ select: ['nickName'] });

    const result = {
      msg: 'success',
      rows: rows,
    };

    this.logger.log(`Returning response: ${JSON.stringify(result)}`);

    return result;
  }
}
