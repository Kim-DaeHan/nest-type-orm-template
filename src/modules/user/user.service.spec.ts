import type { TestingModule } from '@nestjs/testing';

import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

import type { Repository } from 'typeorm';

// import { ServiceException } from 'src/errors/serviceException';

const mockUserRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let service: UserService;
  let userRepository: MockRepository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<MockRepository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  describe('findAll', () => {
    it('should be find All', async () => {
      userRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(userRepository.find).toHaveBeenCalledTimes(1);

      expect(result).toEqual({ msg: 'success', rows: [] });
    });

    // it('should fail on exception', async () => {
    //   await expect(service.findAll()).rejects.toThrowError(ServiceException);
    // });
  });
});
