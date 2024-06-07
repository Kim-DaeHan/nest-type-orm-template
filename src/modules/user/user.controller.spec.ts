import type { TestingModule } from '@nestjs/testing';

import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ServiceException } from 'src/errors/serviceException';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import type { ResponseDto } from './dto/response-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return event participants list', async () => {
      const expectedResult: ResponseDto = {
        msg: 'success',
        rows: [
          {
            id: 1,
            nickName: 'hans',
            walletAddr: '11',
            email: 'kjs',
            createdAt: new Date(),
          },
        ],
      };

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
    });

    it('should handle service exceptions and throw HTTP exception', async () => {
      const errorMessage = 'Test service error';
      const serviceException = new ServiceException(400, errorMessage);

      jest.spyOn(service, 'findAll').mockRejectedValue(serviceException);

      await expect(controller.findAll()).rejects.toThrowError(new HttpException(errorMessage, 400));
    });

    it('should handle unexpected errors and throw internal server error', async () => {
      const errorMessage = 'Unexpected error';

      jest.spyOn(service, 'findAll').mockRejectedValue(new Error(errorMessage));

      await expect(controller.findAll()).rejects.toThrowError(new InternalServerErrorException(errorMessage));
    });
  });
});
